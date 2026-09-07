// Integración: Modificar el WebComponent de modo que el modelo le permita agregar 
// dinámicamente (círculos y polígonos) ubicables en cualquier punto (x,y) del área de dibujo, 
// como así también, limpiar toda el área de dibujo. El componente tendrá que tener un 
// botón de carga de figuras, que al realizar click, lance un prompt esperando el objeto JSON 
// para representarlo inmediatamente en el canvas. También deberá tener un botón de limpieza.

import { Model, View, Controller } from './MVCCanvas.js';

// 1. MODELO: Ahora guarda una lista de figuras
class Ejercicio6Model extends Model {
    constructor() {
        super();
        this.figuras = []; // Aquí guardo los poligonos y circulos
    }

    agregarFigura(figura) {
        this.figuras.push(figura);
        this.changed(); // Aviso que cambiaron los datos
    }

    limpiar() {
        this.figuras = []; // Se vacia el array
        this.changed(); // Aviso que cambiaron los datos
    }
}

// 2. VISTA: Agrego los botones y la logica de dibujo
class Ejercicio6View extends View {
    constructor() {
        super(); // Creo el canvas base
        
        // Creo los botones
        this._btnCargar = document.createElement('button');
        this._btnCargar.textContent = 'Cargar Figura (JSON)';
        this._btnCargar.style.margin = '10px';
        
        this._btnLimpiar = document.createElement('button');
        this._btnLimpiar.textContent = 'Limpiar Canvas';
        this._btnLimpiar.style.margin = '10px';

        // Los agrego antes del canvas
        this.insertBefore(this._btnCargar, this._canvas);
        this.insertBefore(this._btnLimpiar, this._canvas);

        // Eventos de los botones (disparan 'request' al controlador)
        this._btnCargar.addEventListener('click', function() {
            let jsonStr = prompt("Ingresá el JSON de la figura:");
            if (jsonStr) {
                try {
                    let figura = JSON.parse(jsonStr);
                    this.dispatchEvent(new CustomEvent('request', { detail: { tipo: 'agregar', data: figura } }));
                } catch (e) {
                    alert("JSON inválido");
                }
            }
        }.bind(this)); // Uso .bind(this) para que 'this' siga siendo la vista

        this._btnLimpiar.addEventListener('click', function() {
            this.dispatchEvent(new CustomEvent('request', { detail: { tipo: 'limpiar' } }));
        }.bind(this)); // Uso .bind(this) para que 'this' siga siendo la vista
    }

    // Método para dibujar todas las figuras del array
    dibujarTodas(figuras) {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // Limpiamos el canvas visualmente
        
        ctx.strokeStyle = "black";
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.lineWidth = 2;

        figuras.forEach(function(fig) {
            ctx.beginPath();
            if (fig.tipo === 'circulo') {
                ctx.arc(fig.x, fig.y, fig.radio, 0, 2 * Math.PI);
            } else if (fig.tipo === 'poligono' && fig.puntos && fig.puntos.length > 0) {
                ctx.moveTo(fig.puntos[0].x, fig.puntos[0].y);
                for (let i = 1; i < fig.puntos.length; i++) {
                    ctx.lineTo(fig.puntos[i].x, fig.puntos[i].y);
                }
                ctx.closePath();
            }
            ctx.fill();
            ctx.stroke();
        });
    }
}

customElements.define('x-ejercicio6-view', Ejercicio6View);

// 3. CONTROLADOR: Conecta los botones con el modelo y el redibujado
class Ejercicio6Controller extends Controller {
    onViewRequest(event) {
        let accion = event.detail.tipo;
        if (accion === 'agregar') {
            this._model.agregarFigura(event.detail.data);
        } else if (accion === 'limpiar') {
            this._model.limpiar();
        }
    }

    onModelChanged() {
        // Cuando el modelo cambia, le pido a la vista que dibuje todo de nuevo
        this._view.dibujarTodas(this._model.figuras);
    }
}

function main() {
    let myModel = new Ejercicio6Model();
    let myView = new Ejercicio6View(); 
    let myController = new Ejercicio6Controller(myView, myModel);
    
    myController.enable();
    document.body.appendChild(myView);
}

window.onload = main;