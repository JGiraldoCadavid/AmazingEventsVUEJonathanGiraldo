import {imprimirTarjetas, imprimirCajasVerificacion, filtrarCruzado} from "../modules/functions.js";

let eventos;
let urlDetalles="./assets/pages/details.html";
let contTarjetas=document.getElementById("contTarjetas")
let contCajasVerificacion= document.getElementById("contCajasVerificacion");
let entradaTexto= document.getElementById("buscador");
let botonBusqueda= document.querySelector(".lupa");
let urlApi='https://mindhub-xj03.onrender.com/api/amazing';

fetch(urlApi)
    .then(resolve => resolve.json())
    .then(data => {
        eventos=data.events
        let filtroCategorias= Array.from(new Set(eventos.map(evento => evento.category)))
        imprimirTarjetas(eventos,contTarjetas,urlDetalles);
        imprimirCajasVerificacion(filtroCategorias, contCajasVerificacion)
    })
    .catch(err => err)

contCajasVerificacion.addEventListener('input', () => {
    let filtCajasVerificacion= filtrarCruzado(eventos,entradaTexto)
    imprimirTarjetas(filtCajasVerificacion,contTarjetas, urlDetalles)
})

botonBusqueda.addEventListener('click', () => {
    let filtBuscador= filtrarCruzado(eventos,entradaTexto)
    imprimirTarjetas(filtBuscador,contTarjetas,urlDetalles)
})