// Construya una función que sea capaz de dibujar una cruz diagonal 
// (cruzando los vértices) de toda el área de dibujo.

import { Model, View, Controller } from './MVCCanvas.js';

function main() {
    let myModel = new Model();
    let myView = new View();
    let myController = new Controller(myView, myModel);
    myController.enable();
    document.body.appendChild(myView);
    
    let ctx = myView._canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 600);
    ctx.stroke();
    
    ctx.moveTo(800, 0);
    ctx.lineTo(0, 600);
    ctx.stroke();
    ctx.closePath();
}

window.onload = main;