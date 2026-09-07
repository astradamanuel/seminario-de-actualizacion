/* 2. Construya un programa que solicite al usuario su fecha de nacimiento y que luego valide 
si la cadena de texto ingresada es realmente una fecha. En caso de que no, deberá mostrar un 
mensaje de error notificando que el texto suministrado es inválido y que vuelva a pedir 
la fecha hasta que sea válida. Cada error deberá incluir el número de reintentos. */

class RegistroUsuario extends HTMLElement {

    constructor() {
        super();

        // Crear Shadow DOM
        this.attachShadow({ mode: 'open' });
        // Contador de intentos
        this.intentos = 0;
        // ✅ 2. Binding de eventos en el constructor 
        this.onRegistrarClick = this.onRegistrarClick.bind(this); 

        this.inputFecha = this.crearInput("Fecha de nacimiento xx/xx/xxxx");



    }

    connectedCallback() {
        this.boton.addEventListener("click", this.onRegistrarClick);
    }

    disconnectedCallback() {
        this.boton.removeEventListener("click", this.onRegistrarClick);
    }

    crearBoton() {
        const button = document.createElement("button");
        button.fecha = "Fecha";
        return button;
    }

    onRegistrarClick() {
        let fecha = this.querySelector("#fechaNacimiento").value;

        // Aumentar intentos
        this.intentos++;

        // Separar día, mes y año
        let partes = fecha.split("/");

        // Verificar formato
        if (partes.length !== 3) {

            this.querySelector("#resultado").innerText =
                `Fecha inválida. Reintento número ${this.intentos}`;

            return;
        }

        let dia = parseInt(partes[0]);
        let mes = parseInt(partes[1]);
        let anio = parseInt(partes[2]);

        // Crear fecha
        let fechaValida = new Date(anio, mes - 1, dia);

        // Validar fecha real
        if (
            fechaValida.getFullYear() === anio &&
            fechaValida.getMonth() === mes - 1 &&
            fechaValida.getDate() === dia
        ) {

            this.querySelector("#resultado").innerText =
                "Fecha válida";

        } else {

            this.querySelector("#resultado").innerText =
                `Fecha inválida. Reintento número ${this.intentos}`;
        }
    }
}

// Definir el componente
customElements.define("registro-usuario", RegistroUsuario);