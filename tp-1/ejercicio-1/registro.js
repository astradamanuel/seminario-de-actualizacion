// 1. Construya un programa que solicite al usuario el nombre, luego el apellido y finalmente 
// muestre un saludo como el siguiente: ¡Buenos días APELLIDO, Nombre!. 
// Teniendo en cuenta que el apellido aparezca completamente en mayúsculas y el 
// nombre con la mayúscula en la primera letra. Independientemente de cómo sea recibidas las 
// cadenas de texto.

class RegistroUsuario extends HTMLElement /* Siempre que usás extends, necesitás super() */ {
    constructor() /* “inicio” del objeto */ { 
        super(); /* llama al constructor de HTMLElement */
    }

    /* this = el componente <registro-usuario>, se mete HTML dentro */ 

    connectedCallback() {
        this.innerHTML = ` 
            <input type="text" id="nombre" placeholder="Ingrese su nombre">
            <br><br>
            <input type="text" id="apellido" placeholder="Ingrese su apellido">
            <br><br>
            <button id="btnRegistrar">Registrar</button>
            <p id="resultado"></p>
        `; /* se crea dos inputs, un boton y un parrafo para mostrar resultado */

        this.querySelector("#btnRegistrar") /* Busca dentro del componente el botón */ 
            .addEventListener("click", () => this.registrar()); /* Ejecuta registrar() */
            /* () => (arrow function) mantiene el this correcto */
    }

    registrar() { /* Esta función se ejecuta cuando hacés click */ 
        let nombre = this.querySelector("#nombre").value; /* Va a los inputs y lee lo que escribió el usuario */
        let apellido = this.querySelector("#apellido").value; /* Va a los inputs y lee lo que escribió el usuario */

        if (nombre === "" || apellido === "") { /* Si alguno está vacío → error */
            alert("Por favor complete todos los campos");
            return;
        }

        // Formateo
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        apellido = apellido.toUpperCase(); /* Formateo del nombre y apellido */

        this.querySelector("#resultado").innerText = /* Busca el <p> y le cambia el texto */
            `¡Buenos días ${apellido}, ${nombre}!`; 
    }
}

// Definir el componente
customElements.define("registro-usuario", RegistroUsuario);
/* Registrar el componente. Le decís al navegador: “Cuando veas <registro-usuario>, usá esta clase”
Si esto no está → el componente no existe */