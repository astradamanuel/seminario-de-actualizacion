// Configurar el área de dibujo para tener forma de cuadrado de (500,500)px. 
// Empleando las primitivas de dibujo de arcos de elipse, dibujar círculos 
// concéntricos hasta el centro del área, espaciados en 25px c/u.

import { Model, View, Controller } from './MVCCanvas.js';

// Creo una vista específica para este ejercicio que hereda de la base
class Ejercicio4View extends View {
    constructor() {
        super(); 
        
        // Redefino el tamaño para este ejercicio
        this._canvas.width = 500;
        this._canvas.height = 500;
    }
}

customElements.define('x-ejercicio4-view', Ejercicio4View);

function main() {
    let myModel = new Model();
    let myView = new Ejercicio4View(); // Usamos nuestra nueva vista de 500x500
    let myController = new Controller(myView, myModel);
    
    myController.enable();
    document.body.appendChild(myView);
    let ctx = myView._canvas.getContext('2d');
    let canvas = myView._canvas; 

    let xc = canvas.width / 2;
    let yc = canvas.height / 2;
    let r = canvas.width / 2; 
    let ai = 0;
    let af = 2 * Math.PI;
    let s = 25;

while (r > 0) {
    ctx.beginPath(); // Reinicio el trazo para cada círculo
    
    ctx.arc(xc, yc, r, ai, af); 
    
    ctx.stroke(); // Dibujo el círculo actual
    
    r = r - s; // Se reduce el radio para el próximo círculo
}

}

window.onload = main;