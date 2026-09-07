// 1. Construya un programa que solicite al usuario el nombre, luego el apellido y finalmente 
// muestre un saludo como el siguiente: ¡Buenos días APELLIDO, Nombre!. 
// Teniendo en cuenta que el apellido aparezca completamente en mayúsculas y el 
// nombre con la mayúscula en la primera letra. Independientemente de cómo sea recibidas las 
// cadenas de texto.

class RegistroUsuario extends HTMLElement {
    constructor() {
        super();
        
        // ✅ 1. Crear Shadow DOM
        this.attachShadow({ mode: 'open' });
        
        // ✅ 2. Binding de eventos en el constructor 
        this.onRegistrarClick = this.onRegistrarClick.bind(this); 
        
        // ✅ 3. Construcción de elementos en el constructor 
        this.inputNombre = this.crearInput("nombre", "Ingrese su nombre");
        /* Meté el input de nombre dentro del Shadow DOM */
        this.inputApellido = this.crearInput("apellido", "Ingrese su apellido");
        this.boton = this.crearBoton();
        this.resultado = this.crearParrafo();
        
        // ✅ 4. Ensamblaje en el shadowRoot
        this.shadowRoot.appendChild(this.inputNombre);
        this.shadowRoot.appendChild(document.createElement("br"));
        this.shadowRoot.appendChild(document.createElement("br"));
        this.shadowRoot.appendChild(this.inputApellido);
        this.shadowRoot.appendChild(document.createElement("br"));
        this.shadowRoot.appendChild(document.createElement("br"));
        this.shadowRoot.appendChild(this.boton);
        this.shadowRoot.appendChild(this.resultado);
    }
    
    // ✅ Métodos de creación separados 
    crearInput(id, placeholder) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = id;
        input.placeholder = placeholder;
        return input;
    }
    
    crearBoton() {
        const button = document.createElement("button");
        button.id = "btnRegistrar";
        button.textContent = "Registrar";
        return button;
    }
    
    crearParrafo() {
        const p = document.createElement("p");
        p.id = "resultado";
        return p;
    }
    
    // ✅ connectedCallback 
    /* connectedCallback() se ejecuta cuando el elemento es conectado al DOM 
    Cuando hagan click en mi botón, ejecutá onRegistrarClick */
    connectedCallback() {
        this.boton.addEventListener("click", this.onRegistrarClick);
    }
    
    // ✅ disconnectedCallback limpia eventos simétricamente
    disconnectedCallback() {
        this.boton.removeEventListener("click", this.onRegistrarClick);
    }
    
    // ✅ Método normal 
    onRegistrarClick() {
        let nombre = this.inputNombre.value;
        let apellido = this.inputApellido.value;
        
        // Validación
        if (nombre === "" || apellido === "") {
            alert("Por favor complete todos los campos");
            return;
        }
        
        // Formateo 
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        apellido = apellido.toUpperCase();
        
        // Actualizar resultado
        this.resultado.textContent = `¡Buenos días ${apellido}, ${nombre}!`;
    }
}

customElements.define("registro-usuario", RegistroUsuario); /*  Cuando encuentres <registro-usuario>, utilizá la clase RegistroUsuario */


