export function crearTarjeta(evento,urlDetalles) {
    return `<div class="card mb-3 me-3 ms-3">
              <div class="d-flex flex-column align-items-center">
                  <img src="${evento.image}" class="card-img-top img-card" alt="music concert">
                  <div class="card-body d-flex flex-column text-center">
                      <h3 class="card-title">${evento.name}</h3>
                      <p class="card-text">${evento.description}</p>
                  </div>
              </div>
              <div class="card-body body-bottom d-flex justify-content-between">
              <p>$${evento.price}</p>
              <a href="${urlDetalles}?parametro=${evento._id}" class="btn-details btn btn-primary">Details</a>
              </div>
          </div>`;
}

export function imprimirTarjetas(eventos,contenedor, urlDetalles) {
    if (eventos.length>0) {
        let html = "";

        for(const evento of eventos){
            html += crearTarjeta(evento, urlDetalles);
        }
        contenedor.innerHTML = html;
    } else {
        contenedor.innerHTML = `<p class="text-center fs-2 text-light">No information was found under those search criteria</p>`;
        let main = document.querySelector("main");
        main.classList.remove("justify-content-between");
        contenedor.classList.add("flex-grow-1", "mt-5");
    }
} 

export function crearCajasVerificacion(categoria){
    return   `<div class="ms-3 me-2 mb-3">
                 <div class="form-check">
                 <input class="form-check-input seleccion" type="checkbox" id="${categoria}">
                 <label class="form-check-label" for="${categoria}">
                     ${categoria}
                 </label>
                 </div>
             </div>`
}

export function imprimirCajasVerificacion(categorias, contCajasVerificacion){
    let contenidoHtml="";
    
    categorias.forEach(categoria => {
        contenidoHtml+=crearCajasVerificacion(categoria);
    })

    contCajasVerificacion.innerHTML=contenidoHtml;
}

export function filtrarPorCajasVerificacion(eventos){
    let valoresSeleccionados= Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.id);

    if(valoresSeleccionados.length>0){
        return eventos.filter(evento => valoresSeleccionados.includes(evento.category));
    }else{
        return eventos;
    }
    
}

export function filtrarPorBuscador(eventos, entradaTexto){
    let valorBusqueda=entradaTexto.value;

    let valoresSeleccionados = eventos.filter(evento => evento.name.toLocaleLowerCase().includes(valorBusqueda.toLocaleLowerCase()));

    if(valoresSeleccionados.length>0){
        return valoresSeleccionados;
    }else{
        return [];
    }
}

export function filtrarCruzado(eventos,entradaTexto){
    const filtroBuscador= filtrarPorBuscador(eventos,entradaTexto);
    const filtroCajasVerificacion= filtrarPorCajasVerificacion(filtroBuscador);
    return filtroCajasVerificacion;
}