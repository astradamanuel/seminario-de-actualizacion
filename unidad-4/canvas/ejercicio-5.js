// Reutilizando el código del punto anterior, y empleando las primitivas de dibujado de texto. 
// Construir un tablero de dardos, en donde se reparta el área del cuadrado para que 
// entren hasta 5 círculos concéntricos. Entre el espacio de cada círculo, se 
// deberá distribuir el valor de puntaje según el array: [1000, 750, 500, 100, 50] 
// donde el centro representa el mayor valor.

import { Model, View, Controller } from './MVCCanvas.js';

// Creo una vista específica para este ejercicio que hereda de la base
class Ejercicio5View extends View {
    constructor() {
        super(); 
        
        // Redefino el tamaño para este ejercicio
        this._canvas.width = 500;
        this._canvas.height = 500;
    }
}

customElements.define('x-ejercicio5-view', Ejercicio5View);

function main() {
    let myModel = new Model();
    let myView = new Ejercicio5View(); // Usamos nuestra nueva vista de 500x500
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
    let puntaje = [50, 100, 500, 750, 1000];
    let i = 0;



while (r > 0) {
    ctx.beginPath(); // Reinicio el trazo para cada círculo
    
    ctx.arc(xc, yc, r, ai, af); 
    
    ctx.stroke(); // Dibujo el círculo actual

    if (i < puntaje.length){
        
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        
        // TRUCO: (xc + r - 40) pone el texto justo a la izquierda del borde del círculo
        // El +5 en Y es para que quede centrado verticalmente con la línea.
        ctx.fillText(puntaje[i], xc + r - 40, yc + 5);
        
        i++; 
    }

    r = r - 50;

}

}

window.onload = main;