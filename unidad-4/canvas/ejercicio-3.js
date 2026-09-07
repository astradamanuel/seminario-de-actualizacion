// Construya una función que le permita dibujar cualquier polígono cerrado 
// ubicado en el centro del área de dibujo,
// dada una lista ordenada de puntos (x,y).

import { Model, View, Controller } from './MVCCanvas.js';

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();
    document.body.appendChild(myView);

    const puntos = [
    { x: 400, y: 100 },  
    { x: 590, y: 238 },  
    { x: 518, y: 452 },   
    { x: 282, y: 462 },
    { x: 210, y: 238 }
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