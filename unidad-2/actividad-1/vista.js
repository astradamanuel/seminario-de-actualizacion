// vista.js
export class CalculatorView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Array para las referencias genéricas que usarán los eventos simétricos
        this.botonesTabla = [];

        // 1. Crear elemento style e inyectar el CSS puro
        let estilo = document.createElement("style");
        estilo.textContent =
            ":host { display: block; }" +
            ".calculadora-container { background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); width: 260px; margin: auto; font-family: Arial, sans-serif; }" +
            "input { width: 100%; height: 50px; font-size: 30px; text-align: right; margin-bottom: 20px; padding-right: 10px; box-sizing: border-box; border: 2px solid #ddd; border-radius: 4px; background: white; }" +
            "button { width: 50px; height: 50px; border: none; border-radius: 6px; font-weight: bold; font-size: 18px; cursor: pointer; transition: transform 0.1s; }" +
            "button:active { transform: translateY(3px); box-shadow: none !important; }" +
            ".boton-num { background-color: #4A90E2; color: white; box-shadow: 0px 4px #357ABD; }" +
            ".boton-op { background-color: #7ED321; color: white; box-shadow: 0px 4px #6BB11B; }" +
            ".boton-igual { background-color: #F5A623; color: white; box-shadow: 0px 4px #D48E1D; }" +
            ".vestimenta-boton-borrar { color: white; font-family: arial; font-weight: bold; font-size: 70%; background-color: red; box-shadow: 0px 5px #BB3E22; width: 100%; height: 38px; border-radius: 6px; border-color: #BB3E22; margin-top: 10px; }" +
            "table { width: 100%; border-spacing: 10px; }";
        this.shadowRoot.appendChild(estilo);

        // 2. Crear la estructura del contenedor principal
        this.container = document.createElement("div");
        this.container.className = "calculadora-container";

        this.pantalla = document.createElement("input");
        this.pantalla.type = "text";
        this.pantalla.value = "0";
        this.pantalla.readOnly = true; 
        this.container.appendChild(this.pantalla);

        this.tabla = document.createElement("table");

        // 3. DAR IDENTIDAD PROPIA A CADA BOTÓN (Requisito del profesor)
        this.btn7 = this.configurarBoton("7", "boton-num");
        this.btn8 = this.configurarBoton("8", "boton-num");
        this.btn9 = this.configurarBoton("9", "boton-num");
        this.btnMas = this.configurarBoton("+", "boton-op");

        this.btn4 = this.configurarBoton("4", "boton-num");
        this.btn5 = this.configurarBoton("5", "boton-num");
        this.btn6 = this.configurarBoton("6", "boton-num");
        this.btnMenos = this.configurarBoton("-", "boton-op");

        this.btn3 = this.configurarBoton("3", "boton-num");
        this.btn2 = this.configurarBoton("2", "boton-num");
        this.btn1 = this.configurarBoton("1", "boton-num");
        this.btnMulti = this.configurarBoton("*", "boton-op");

        this.btn0 = this.configurarBoton("0", "boton-num");
        this.btnPunto = this.configurarBoton(".", "boton-num");
        this.btnIgual = this.configurarBoton("=", "boton-igual");
        this.btnDivi = this.configurarBoton("/", "boton-op");

        this.btnBorrar = this.configurarBoton("Borrar", "vestimenta-boton-borrar");

        // 4. Armado explícito de la tabla sin bucles dinámicos de filas
        let fila1 = this.tabla.insertRow();
        fila1.insertCell().appendChild(this.btn7);
        fila1.insertCell().appendChild(this.btn8);
        fila1.insertCell().appendChild(this.btn9);
        fila1.insertCell().appendChild(this.btnMas);

        let fila2 = this.tabla.insertRow();
        fila2.insertCell().appendChild(this.btn4);
        fila2.insertCell().appendChild(this.btn5);
        fila2.insertCell().appendChild(this.btn6);
        fila2.insertCell().appendChild(this.btnMenos);

        let fila3 = this.tabla.insertRow();
        fila3.insertCell().appendChild(this.btn3);
        fila3.insertCell().appendChild(this.btn2);
        fila3.insertCell().appendChild(this.btn1);
        fila3.insertCell().appendChild(this.btnMulti);

        let fila4 = this.tabla.insertRow();
        fila4.insertCell().appendChild(this.btn0);
        fila4.insertCell().appendChild(this.btnPunto);
        fila4.insertCell().appendChild(this.btnIgual);
        fila4.insertCell().appendChild(this.btnDivi);

        this.container.appendChild(this.tabla);
        this.container.appendChild(this.btnBorrar);
        this.shadowRoot.appendChild(this.container);

        // Enlazamos de forma tradicional el manejador interno
        this.manejarAccionBoton = this.manejarAccionBoton.bind(this);
    }

    // Método auxiliar para no repetir 4 líneas de código por cada uno de los 17 botones, 
    // pero manteniendo la instancia única en el constructor.
    configurarBoton(texto, clase) {
        let btn = document.createElement("button");
        btn.innerText = texto;
        btn.className = clase;
        btn.dataset.valor = texto;
        
        // Si no es el botón de borrar, lo metemos en el array global para los eventos
        if (texto !== "Borrar") {
            this.botonesTabla.push(btn);
        }
        return btn;
    }

    // La vista captura el evento de forma tradicional y se lo notifica a quien escuche (Controlador)
    connectedCallback() {
        this.btnBorrar.addEventListener("click", this.manejarAccionBoton);
        for (let i = 0; i < this.botonesTabla.length; i++) {
            this.botonesTabla[i].addEventListener("click", this.manejarAccionBoton);
        }
    }

    disconnectedCallback() {
        this.btnBorrar.removeEventListener("click", this.manejarAccionBoton);
        for (let i = 0; i < this.botonesTabla.length; i++) {
            this.botonesTabla[i].removeEventListener("click", this.manejarAccionBoton);
        }
    }

    // Registra la función callback que le va a pasar el controlador de forma clásica
    setControladorCallback(callback) {
        this.controladorCallback = callback;
    }

    manejarAccionBoton(evento) {
        if (this.controladorCallback) {
            this.controladorCallback(evento.target.dataset.valor);
        }
    }

    actualizarPantalla(valor) {
        this.pantalla.value = valor;
    }

    obtenerValorPantalla() {
        return this.pantalla.value;
    }
}

customElements.define("x-calculadora", CalculatorView);