// Dado un objeto de datos: [ 0.30, 0.50, 0.10, 0.10 ] que representa información porcentual, 
// elaborar una función que procese el array y dibuje la representación visual como un gráfico 
// de torta mostrando el valor del porcentaje como texto. 

import { Model, View, Controller } from './MVCCanvas.js';

// 1. Clase específica del ejercicio
class Ejercicio7View extends View {
    constructor() {
        super(); 
        
        // Redefino el tamaño para este ejercicio
        this._canvas.width = 500;
        this._canvas.height = 500;
    }
}

customElements.define('x-ejercicio7-view', Ejercicio7View);

function dibujarTorta(ctx, datos) {
    let xc = ctx.canvas.width / 2;
    let yc = ctx.canvas.height / 2;
    let radio = 200; 
    let anguloActual = 0; 
    
    let colores = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

    for (let i = 0; i < datos.length; i++) {
        let valor = datos[i];
        let anguloPorcion = valor * 2 * Math.PI;
        let anguloFinal = anguloActual + anguloPorcion;

        // Dibujar la porción
        ctx.beginPath();
        ctx.moveTo(xc, yc); 
        ctx.arc(xc, yc, radio, anguloActual, anguloFinal); 
        ctx.closePath(); 
        
        ctx.fillStyle = colores[i % colores.length]; 
        ctx.fill(); 
        ctx.stroke(); 

        // Dibujar el texto
        let anguloMedio = anguloActual + (anguloPorcion / 2);
        let xTexto = xc + Math.cos(anguloMedio) * (radio * 0.6);
        let yTexto = yc + Math.sin(anguloMedio) * (radio * 0.6);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        let porcentaje = (valor * 100).toFixed(0) + "%"; 
        ctx.fillText(porcentaje, xTexto, yTexto);

        anguloActual = anguloFinal;
    }
}

function main() {
    let myModel = new Model();
    
    let myView = new Ejercicio7View(); 
    
    let myController = new Controller(myView, myModel);
    
    myController.enable();
    document.body.appendChild(myView);

    let ctx = myView._canvas.getContext('2d');
    let datosTorta = [0.30, 0.50, 0.10, 0.10];
    
    dibujarTorta(ctx, datosTorta);
}

window.onload = main;