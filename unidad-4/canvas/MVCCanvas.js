class Model extends EventTarget {
    constructor() {
        super();
        this.figuras = [];
    }

    // Método interno para validar e integrar las figuras
    esFiguraValida(figura) {
        if (!figura || typeof figura !== 'object') return false;

        // Normalizamos grosor y estilo dentro del mismo objeto
        let grosor = parseFloat(figura.grosor);
        figura.grosor = (!isNaN(grosor) && grosor > 0) ? grosor : 1.0;
        figura.estiloLinea = figura.estiloLinea || 'continua';

        // Validación si es un Círculo
        if (figura.tipo === 'circulo') {
            let x = Number(figura.x);
            let y = Number(figura.y);
            let radio = Number(figura.radio);

            return !isNaN(x) && !isNaN(y) && !isNaN(radio) && radio > 0;
        }

        // Validación si es un Polígono (mínimo 3 puntos)
        if (figura.tipo === 'poligono') {
            if (!Array.isArray(figura.puntos) || figura.puntos.length < 3) return false;

            return figura.puntos.every(p => 
                p && !isNaN(Number(p.x)) && !isNaN(Number(p.y))
            );
        }

        return false; 
    }

    agregarFigura(figura) {
        // El Modelo usa su propio método esFiguraValida
        if (this.esFiguraValida(figura)) {
            this.figuras.push(figura);
            this.changed();
        } else {
            console.warn("Intento de agregar figura o JSON inválido:", figura);
            alert("Error: El JSON o datos ingresados no corresponden a un Círculo o Polígono válido.");
        }
    }

    limpiar() {
        this.figuras = [];
        this.changed();
    }
   
    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}

class View extends HTMLElement {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '2px solid black';
        this._canvas.style.display = 'block';
        this.ctx = this._canvas.getContext('2d');
    }

    connectedCallback() {
        if (!this.contains(this._canvas)) {
            this.appendChild(this._canvas);
        }
    }

    render(figuras = []) {
        this.clear();

        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "rgba(50, 150, 250, 0.3)";

        figuras.forEach(fig => {
            this.ctx.beginPath();

            // Trazado de la geometría
            if (fig.tipo === 'circulo') {
                this.ctx.arc(fig.x, fig.y, fig.radio, 0, 2 * Math.PI);
            } else if (fig.tipo === 'poligono' && fig.puntos && fig.puntos.length > 0) {
                this.ctx.moveTo(fig.puntos[0].x, fig.puntos[0].y);
                for (let i = 1; i < fig.puntos.length; i++) {
                    this.ctx.lineTo(fig.puntos[i].x, fig.puntos[i].y);
                }
                this.ctx.closePath();
            }

            // Grosor de línea 
            this.ctx.lineWidth = parseFloat(fig.grosor) || 1.0;

            // Configuración del estilo de línea
            if (fig.estiloLinea === 'punteada') {
                this.ctx.setLineDash([5, 5]);
            } else {
                this.ctx.setLineDash([]);
            }

            this.ctx.fill();
            this.ctx.stroke();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}

if (!customElements.get('x-view')) {
    customElements.define('x-view', View);
}

class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }

    enable() {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
        this._view.removeEventListener('request', this._onViewRequest);
    }

    onModelChanged() {
        this._view.render(this._model.figuras);
    }

    onViewRequest(event) {
        let accion = event.detail.tipo;
        if (accion === 'agregar') {
            this._model.agregarFigura(event.detail.data);
        } else if (accion === 'limpiar') {
            this._model.limpiar();
        }
    }
}