class Calculadora extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.operacionActual = "";

        // Insertamos tus estilos de style.css
        const estilo = `
            <style>
                :host {
                    display: block; /* Permite que el componente tenga dimensiones */
                }
                .calculadora-container {
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                    width: 260px;
                    margin: auto; /* Centrado dentro de su contenedor */
                    font-family: Arial, sans-serif;
                }

                input {
                    width: 100%;
                    height: 50px;
                    font-size: 30px;
                    text-align: right;
                    margin-bottom: 20px;
                    padding-right: 10px;
                    box-sizing: border-box;
                    border: 2px solid #ddd;
                    border-radius: 4px;
                    background: white;
                }

                button {
                    width: 50px;
                    height: 50px;
                    border: none;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 18px;
                    cursor: pointer;
                    transition: transform 0.1s;
                }

                button:active {
                    transform: translateY(3px);
                    box-shadow: none !important;
                }

                .boton-num {
                    background-color: #4A90E2;
                    color: white;
                    box-shadow: 0px 4px #357ABD;
                }

                .boton-op {
                    background-color: #7ED321;
                    color: white;
                    box-shadow: 0px 4px #6BB11B;
                }

                .boton-igual {
                    background-color: #F5A623;
                    color: white;
                    box-shadow: 0px 4px #D48E1D;
                }

                .vestimenta-boton-borrar {
                    color: white;
                    font-family: arial;
                    font-weight: bold;
                    font-size: 70%;
                    background-color: red;
                    box-shadow: 0px 5px #BB3E22;
                    width: 100%;
                    height: 38px;
                    border-radius: 6px;
                    border-color: #BB3E22;
                    margin-top: 10px;
                }

                table {
                    width: 100%;
                    border-spacing: 10px;
                }
            </style>
        `;

        // Crear la estructura
        this.container = document.createElement("div");
        this.container.className = "calculadora-container";

        this.pantalla = document.createElement("input");
        this.pantalla.type = "text";
        this.pantalla.value = "0";
        this.pantalla.readOnly = true; 

        this.container.appendChild(this.pantalla);

        this.tabla = document.createElement("table");
        this.crearFila(["7","8","9","+"], ["num","num","num","op"]);
        this.crearFila(["4","5","6","-"], ["num","num","num","op"]);
        this.crearFila(["3","2","1","*"], ["num","num","num","op"]);
        this.crearFila(["0",".","=","/"], ["num","num","igual","op"]);

        this.container.appendChild(this.tabla);

        this.btnBorrar = document.createElement("button");
        this.btnBorrar.innerText = "Borrar";
        this.btnBorrar.className = "vestimenta-boton-borrar";
        this.container.appendChild(this.btnBorrar);

        // Renderizar en el Shadow DOM
        this.shadowRoot.innerHTML = estilo;
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.btnBorrar.onclick = () => this.borrar();
    }

    crearFila(valores, tipos) {
        let tr = document.createElement("tr");
        valores.forEach((v, i) => {
            let td = document.createElement("td");
            let btn = document.createElement("button");
            btn.innerText = v;

            if (tipos[i] === "num") btn.className = "boton-num";
            if (tipos[i] === "op") btn.className = "boton-op";
            if (tipos[i] === "igual") btn.className = "boton-igual";

            btn.onclick = (v === "=") ? () => this.calcular() : () => this.presionar(v);

            td.appendChild(btn);
            tr.appendChild(td);
        });
        this.tabla.appendChild(tr);
    }

    presionar(valor) {
        if (this.pantalla.value === "0" && valor !== ".") {
            this.operacionActual = valor;
        } else {
            this.operacionActual += valor;
        }
        this.actualizarPantalla();
    }

    borrar() {
        this.operacionActual = "";
        this.pantalla.value = "0";
    }

    calcular() {
        try {
            let resultado = eval(this.operacionActual);
            this.operacionActual = resultado.toString();
            this.actualizarPantalla();
        } catch {
            this.pantalla.value = "Error";
            this.operacionActual = "";
        }
    }

    actualizarPantalla() {
        this.pantalla.value = this.operacionActual;
    }
}

customElements.define("x-calculadora", Calculadora);