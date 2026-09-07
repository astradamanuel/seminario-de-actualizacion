// Construya una función que le permita dibujar un triángulo dado sus tres 
// vértices en el centro del área de dibujo.

import { Model, View, Controller } from './MVCCanvas.js';

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();
    document.body.appendChild(myView);

    const puntos = [
    { x: 100, y: 100 },  // Punto 1: esquina superior izquierda
    { x: 700, y: 100 },  // Punto 2: esquina superior derecha
    { x: 400, y: 500 }   // Punto 3: punto inferior centro
    ];

    // Función que dibuja la figura recorriendo los puntos
    function dibujarConPuntos(ctx, puntos) {
    ctx.beginPath();
    
    ctx.moveTo(puntos[0].x, puntos[0].y);
    
    // Recorremos los puntos restantes y dibujamos líneas
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }
    
    ctx.closePath();
    ctx.stroke();
}

let ctx = myView._canvas.getContext('2d');
dibujarConPuntos(ctx, puntos);
    
    
}

window.onload = main;