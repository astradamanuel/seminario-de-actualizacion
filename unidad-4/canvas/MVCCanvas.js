class Model extends EventTarget {
    constructor() {
        super();
        this.figuras = [];
    }

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

        // Validación si es un Gráfico de Torta (CakeGraph)
        if (figura.tipo === 'cakeGraph') {
            let x = Number(figura.x);
            let y = Number(figura.y);
            let radio = Number(figura.radio);

            if (!Array.isArray(figura.valores) || figura.valores.length === 0) return false;
            
            let valoresValidos = figura.valores.every(v => !isNaN(Number(v)) && Number(v) >= 0);

            return !isNaN(x) && !isNaN(y) && !isNaN(radio) && radio > 0 && valoresValidos;
        }

        // Validación si es una Imagen
        if (figura.tipo === 'imagen') {
            let x = Number(figura.x);
            let y = Number(figura.y);
            let ancho = Number(figura.ancho);
            let alto = Number(figura.alto);

            let urlValida = typeof figura.url === 'string' && figura.url.trim() !== '';

            return urlValida && !isNaN(x) && !isNaN(y) && !isNaN(ancho) && !isNaN(alto) && ancho > 0 && alto > 0;
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

        // Manejador de eventos de clic con función tradicional
        let self = this;
        this._canvas.addEventListener('click', function(event) {
            let rect = self._canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            // Disparamos un evento personalizado con las coordenadas del click
            self.dispatchEvent(new CustomEvent('request', {
                detail: { tipo: 'canvasClick', x: x, y: y }
            }));
        });
    }

    connectedCallback() {
        if (!this.contains(this._canvas)) {
            this.appendChild(this._canvas);
        }
    }

    render(figuras) {
        if (!figuras) figuras = [];
        this.clear();

        this.ctx.strokeStyle = "black";
        let self = this;

        figuras.forEach(function(fig) {
            // 1. Guardamos el estado actual del contexto
            self.ctx.save();
            
            // 2. Trasladamos el origen de coordenadas a la posición de la figura
            self.ctx.translate(fig.x, fig.y);

            // Grosor de línea 
            self.ctx.lineWidth = parseFloat(fig.grosor) || 1.0;

            // Configuración del estilo de línea
            if (fig.estiloLinea === 'punteada') {
                self.ctx.setLineDash([5, 5]);
            } else {
                self.ctx.setLineDash([]);
            }

            // Trazado de la geometría usando (0,0) como centro local gracias a la traslación
            if (fig.tipo === 'circulo') {
                self.ctx.beginPath();
                self.ctx.arc(0, 0, fig.radio, 0, 2 * Math.PI);
                self.ctx.fillStyle = "rgba(50, 150, 250, 0.3)";
                self.ctx.fill();
                self.ctx.stroke();
            } 
            else if (fig.tipo === 'poligono' && fig.puntos && fig.puntos.length > 0) {
                self.ctx.beginPath();
                self.ctx.moveTo(fig.puntos[0].x, fig.puntos[0].y);
                for (let i = 1; i < fig.puntos.length; i++) {
                    self.ctx.lineTo(fig.puntos[i].x, fig.puntos[i].y);
                }
                self.ctx.closePath();
                self.ctx.fillStyle = "rgba(50, 150, 250, 0.3)";
                self.ctx.fill();
                self.ctx.stroke();
            } 
            else if (fig.tipo === 'cakeGraph' && fig.valores && fig.valores.length > 0) {
                let total = fig.valores.reduce(function(acc, val) {
                    return acc + Number(val);
                }, 0);
                
                if (total > 0) {
                    let anguloActual = 0;
                    fig.valores.forEach(function(valor) {
                        let proporcion = Number(valor) / total;
                        let anguloSiguiente = anguloActual + (proporcion * 2 * Math.PI);

                        self.ctx.beginPath();
                        self.ctx.moveTo(0, 0); // El centro ahora es (0,0)
                        self.ctx.arc(0, 0, fig.radio, anguloActual, anguloSiguiente);
                        self.ctx.closePath();

                        let colorAleatorio = 'hsl(' + (Math.random() * 360) + ', 70%, 65%)';
                        self.ctx.fillStyle = colorAleatorio;

                        self.ctx.fill();
                        self.ctx.stroke();

                        anguloActual = anguloSiguiente;
                    });
                }
            }
            else if (fig.tipo === 'imagen' && fig.url) {
                let img = new Image();
                img.src = fig.url;
                img.onload = function() {
                    // Dibujamos la imagen tomando (0,0) como esquina superior izquierda del bloque trasladado
                    self.ctx.drawImage(img, 0, 0, fig.ancho, fig.alto);
                };
            }

            // 3. Restauramos el contexto para que la traslación no afecte a la siguiente figura
            self.ctx.restore();
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