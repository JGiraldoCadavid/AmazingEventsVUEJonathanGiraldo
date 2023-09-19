import {imprimirTarjetas, imprimirCajasVerificacion, filtrarCruzado} from "../modules/functions.js"

let filtroEventos;
let urlDetalles="./details.html"
let contTarjetas=document.getElementById("contTarjetas")
let contCajasVerificacion= document.getElementById("contCajasVerificacion");
let entradaTexto= document.getElementById("buscador");
let botonBusqueda= document.querySelector(".lupa")
let urlApi='https://mindhub-xj03.onrender.com/api/amazing';

fetch(urlApi)
    .then(resolve => resolve.json())
    .then(data => {
        let eventos=data.events
        let datos=data
        filtroEventos=eventos.filter(evento => datos.currentDate<evento.date)
        let filtroCategorias= Array.from(new Set(filtroEventos.map(evento => evento.category)))
        imprimirTarjetas(filtroEventos,contTarjetas,urlDetalles);
        imprimirCajasVerificacion(filtroCategorias, contCajasVerificacion)
    })
    .catch(err => err)

contCajasVerificacion.addEventListener('input', () => {
    let filtCajasVerificacion= filtrarCruzado(filtroEventos,entradaTexto)
    imprimirTarjetas(filtCajasVerificacion,contTarjetas,urlDetalles)
})

botonBusqueda.addEventListener('click', () => {
    let filtBuscador= filtrarCruzado(filtroEventos,entradaTexto)
    imprimirTarjetas(filtBuscador,contTarjetas,urlDetalles)
})