/* 2. Construya un programa que solicite al usuario su fecha de nacimiento y que luego valide 
si la cadena de texto ingresada es realmente una fecha. En caso de que no, deberá mostrar un 
mensaje de error notificando que el texto suministrado es inválido y que vuelva a pedir 
la fecha hasta que sea válida. Cada error deberá incluir el número de reintentos. */

class RegistroUsuario extends HTMLElement {

    constructor() {
        super();

        // Contador de intentos
        this.intentos = 0;
    }

    connectedCallback() {

        this.innerHTML = `
            <input type="text" id="fechaNacimiento" placeholder="DD/MM/AAAA">

            <br><br>

            <button id="btnFecha">Validar Fecha</button>

            <p id="resultado"></p>
        `;

        this.querySelector("#btnFecha")
            .addEventListener("click", () => this.Fecha());
    }

    Fecha() {

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