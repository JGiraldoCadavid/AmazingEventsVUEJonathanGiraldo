let contFilas1=document.getElementById("contFilas1")
let contFilas2=document.getElementById("contFilas2")
let contFilas3=document.getElementById("contFilas3")
let urlApi='https://mindhub-xj03.onrender.com/api/amazing';

fetch(urlApi)
    .then(resolve => resolve.json())
    .then(data => {
        eventos=data.events
        datos=data

        let eventosFuturos=eventos.filter(evento => datos.currentDate<evento.date)
        let eventosPasados=eventos.filter(evento => datos.currentDate>evento.date)

        let valoresPrimerTabla= calcularValoresPrimerTabla(eventosPasados)
        const [mayorAsistencia, menorAsistencia,mayorAforo] = valoresPrimerTabla

        crearPrimerTabla(mayorAsistencia,menorAsistencia,mayorAforo,contFilas1)

        let estadisticasFuturas = calcularEstadisticasEventos(eventosFuturos);
        let estadisticasPasadas = calcularEstadisticasEventos(eventosPasados);

        const [categoriasFuturas, gananciasFuturas, porcAsistenciaFuturas] = estadisticasFuturas;
        const [categoriasPasadas, gananciasPasadas, porcAsistenciaPasadas] = estadisticasPasadas;

        crearUltimasTablas(categoriasFuturas, gananciasFuturas, porcAsistenciaFuturas, contFilas2, "Upcoming")
        crearUltimasTablas(categoriasPasadas, gananciasPasadas, porcAsistenciaPasadas, contFilas3, "Past")
        
    })
    .catch(err => err)

function crearPrimerTabla(mayorAsistencia,menorAsistencia,mayorAforo,contFilas1){
    contFilas1.innerHTML=
        `<tr>
            <th class="tabla-tit-principal text-center" colspan="3">Events Statistics</th>
        </tr>
        <tr>
            <th>Events with highest % of asistance</th>
            <th>Events with lowest % of assistance</th>
            <th>Events with larger capacity</th>
        </tr>
        <tr>
            <td class="text-center">${mayorAsistencia[0]+' - '+mayorAsistencia[1]} %</td>
            <td class="text-center">${menorAsistencia[0]+' - '+menorAsistencia[1]} %</td>
            <td class="text-center">${mayorAforo[0]+' - '+ mayorAforo[1].toLocaleString('es')}</td>
        </tr>`
}
    
function crearUltimasTablas(categorias, ganancias, porcAsistencia, contFilas, tipoEvento){
    let html=
        `<tr>
            <th class="tabla-tit-principal text-center" colspan="3">${tipoEvento} events statistics by category</th>
            </tr>
            <tr>
                <th>categories</th>
                <th id="ganancias">Revenues</th>
                <th>Percentage of assistance</th>
        </tr>`
    console.log(categorias)
        for (let i  = 0; i < categorias.length; i++) {
            html+= `<tr>
                        <td>${categorias[i]}</td>
                        <td>$ ${(ganancias[i]).toLocaleString('es')}</td>
                        <td>${porcAsistencia[i]} %</td>
                    </tr>`   
        }
        contFilas.innerHTML=html;    
}

function calcularValoresPrimerTabla(eventosPasados){

    let arrayPorcAsistencias = eventosPasados.map(evento => [evento.name, ((evento.assistance / evento.capacity) * 100).toFixed(2)]).sort((evento1,evento2)=>evento2[1] - evento1[1])
    let menorAsistencia= arrayPorcAsistencias[arrayPorcAsistencias.length-1]
    let mayorAsistencia= arrayPorcAsistencias[0]
    let mayorAforo= eventos.map(evento => [evento.name, evento.capacity]).sort((evento1,evento2)=>evento2[1] - evento1[1])[0];

    return [mayorAsistencia, menorAsistencia, mayorAforo]

}
    
function calcularEstadisticasEventos(eventos) {
    let categorias = Array.from(new Set(eventos.map(evento => evento.category)));
        
    let ganancias = categorias.map(categoria => {
        let eventosCategoria = eventos.filter(evento => evento.category == categoria);
        return eventosCategoria.reduce((acumulador, evento) => acumulador + (evento.price * (evento.assistance || evento.estimate)), 0);
    });
      
    let totAsistenciaEstimado = categorias.map(categoria => {
        let eventosCategoria = eventos.filter(evento => evento.category == categoria);
        return eventosCategoria.reduce((acumulador, evento) => acumulador + (evento.assistance || evento.estimate), 0);
    });
      
    let capacidadTotal = categorias.map(categoria => {
        let eventosCategoria = eventos.filter(evento => evento.category == categoria);
        return eventosCategoria.reduce((acumulador, evento) => acumulador + evento.capacity, 0);
    });
    
    let porcAsistenciaEstimado = totAsistenciaEstimado.map((asistenciaEstimado, indice) => ((asistenciaEstimado / capacidadTotal[indice]) * 100).toFixed(2));
    
    return [categorias, ganancias, porcAsistenciaEstimado]
} 