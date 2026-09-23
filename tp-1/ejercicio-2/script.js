/* 2. Construya un programa que solicite al usuario su fecha de nacimiento y que luego valide 
si la cadena de texto ingresada es realmente una fecha. En caso de que no, deberá mostrar un 
mensaje de error notificando que el texto suministrado es inválido y que vuelva a pedir 
la fecha hasta que sea válida. Cada error deberá incluir el número de reintentos. */

class RegistroUsuario extends HTMLElement {

    constructor() {
        super();

        // Crear Shadow DOM
        this.attachShadow({ mode: 'open' });
        // Binding de eventos en el constructor 
        this.onRegistrarClick = this.onRegistrarClick.bind(this); 

        this.inputFecha = this.crearInput("fechaNacimiento", "Ingrese su fecha de nacimiento (DD/MM/AAAA)");
        this.boton = this.crearBoton();
        this.resultado = this.crearParrafo();

        this.shadowRoot.appendChild(this.inputFecha);
        this.shadowRoot.appendChild(document.createElement("br"));
        this.shadowRoot.appendChild(document.createElement("br"));
        this.shadowRoot.appendChild(this.boton);
        this.shadowRoot.appendChild(this.resultado);

        this.intentos = 0;

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
        button.textContent = "Registrar";
        return button;
    }

    crearInput(id, placeholder) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = id;
        input.placeholder = placeholder;
        return input;
    }

    crearParrafo() {
        const p = document.createElement("p");
        p.id = "resultado";
        return p;
    }

    onRegistrarClick() {
        let fecha = this.shadowRoot.querySelector("#fechaNacimiento").value;

        // Separar día, mes y año
        let partes = fecha.split("/");

        // Verificar formato
        if (partes.length !== 3) {

            // Aumentar intentos
            this.intentos++;

            this.shadowRoot.querySelector("#resultado").innerText =
                `Fecha inválida. Reintento número ${this.intentos}`;

            this.inputFecha.value = "";
            this.inputFecha.focus();

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

            this.shadowRoot.querySelector("#resultado").innerText =
                "Fecha válida";

        } else {

            // Aumentar intentos
            this.intentos++;
            this.shadowRoot.querySelector("#resultado").innerText =
                `Fecha inválida. Reintento número ${this.intentos}`;

            this.inputFecha.value = "";
            this.inputFecha.focus();
        }
    }
}

// Definir el componente
customElements.define("registro-usuario", RegistroUsuario);