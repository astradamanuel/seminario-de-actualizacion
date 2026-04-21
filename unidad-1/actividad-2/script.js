class Calculadora extends HTMLElement {
    constructor() {
        super();

        this.operacionActual = "";

        // Crear contenedor
        this.container = document.createElement("div");
        this.container.className = "calculadora-container";

        // Pantalla
        this.pantalla = document.createElement("input");
        this.pantalla.type = "text";
        this.pantalla.value = "0";
        this.pantalla.disabled = true;

        this.container.appendChild(this.pantalla);

        // Tabla
        this.tabla = document.createElement("table");

        // Crear botones
        this.crearFila(["7","8","9","+"], ["num","num","num","op"]);
        this.crearFila(["4","5","6","-"], ["num","num","num","op"]);
        this.crearFila(["3","2","1","*"], ["num","num","num","op"]);
        this.crearFila(["0",".","=","/"], ["num","num","igual","op"]);

        this.container.appendChild(this.tabla);

        // Botón borrar
        this.btnBorrar = document.createElement("button");
        this.btnBorrar.innerText = "Borrar";
        this.btnBorrar.className = "vestimenta-boton-borrar";

        this.container.appendChild(this.btnBorrar);

        this.appendChild(this.container);
    }

    crearFila(valores, tipos) {
        let tr = document.createElement("tr");

        valores.forEach((v, i) => {
            let td = document.createElement("td");
            let btn = document.createElement("button");

            btn.innerText = v;

            // clases
            if (tipos[i] === "num") btn.className = "boton-num";
            if (tipos[i] === "op") btn.className = "boton-op";
            if (tipos[i] === "igual") btn.className = "boton-igual";

            // eventos
            if (v === "=") {
                btn.onclick = () => this.calcular();
            } else {
                btn.onclick = () => this.presionar(v);
            }

            td.appendChild(btn);
            tr.appendChild(td);
        });

        this.tabla.appendChild(tr);
    }

    connectedCallback() {
        this.btnBorrar.onclick = () => this.borrar();
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


// MAIN
window.onload = () => {
    let calc = new Calculadora();
    document.body.appendChild(calc);
};
