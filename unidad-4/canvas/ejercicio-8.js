// Construya un objeto de datos acorde más flexible, que le permita al dibujador de gráficos de torta 
// mostrar una etiqueta de texto personalizada para cada porción junto a su porcentaje.

import { Model, View, Controller } from './MVCCanvas.js';

class Ejercicio8View extends View {
    constructor() {
        super(); 
        this._canvas.width = 500;
        this._canvas.height = 500;
    }
}

customElements.define('x-ejercicio8-view', Ejercicio8View);

function dibujarTorta(ctx, datos) {
    let xc = ctx.canvas.width / 2;
    let yc = ctx.canvas.height / 2;
    let radio = 200; 
    let anguloActual = 0; 
    
    let colores = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

    for (let i = 0; i < datos.length; i++) {
        // se lee el valor del objeto
        let valor = datos[i].valor;
        let anguloPorcion = valor * 2 * Math.PI;
        let anguloFinal = anguloActual + anguloPorcion;

        // se dibuja la porcion
        ctx.beginPath();
        ctx.moveTo(xc, yc); 
        ctx.arc(xc, yc, radio, anguloActual, anguloFinal); 
        ctx.closePath(); 
        
        ctx.fillStyle = colores[i % colores.length]; 
        ctx.fill(); 
        ctx.stroke(); 

        // se dibuja el texto
        let anguloMedio = anguloActual + (anguloPorcion / 2);
        let xTexto = xc + Math.cos(anguloMedio) * (radio * 0.6);
        let yTexto = yc + Math.sin(anguloMedio) * (radio * 0.6);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        //  Convierto el valor a porcentaje
        let porcentaje = (valor * 100).toFixed(0) + "%"; 
        
        //  Dibujo la etiqueta (arriba)
        ctx.fillText(datos[i].etiqueta, xTexto, yTexto - 10);
        
        //  Dibujo el porcentaje (abajo, 10px más abajo)
        ctx.fillText(porcentaje, xTexto, yTexto + 10);

        anguloActual = anguloFinal;
    }
}

function main() {
    let myModel = new Model();
    let myView = new Ejercicio8View(); 
    let myController = new Controller(myView, myModel);
    
    myController.enable();
    document.body.appendChild(myView);

    let ctx = myView._canvas.getContext('2d');
    
    // El nuevo objeto de datos flexible
    let datosTorta = [
        { valor: 0.30, etiqueta: "Manzanas" },
        { valor: 0.50, etiqueta: "Peras" },
        { valor: 0.10, etiqueta: "Naranjas" },
        { valor: 0.10, etiqueta: "Uvas" }
    ];
    
    dibujarTorta(ctx, datosTorta);
}

window.onload = main;