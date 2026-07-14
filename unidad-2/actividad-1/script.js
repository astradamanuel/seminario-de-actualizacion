// script.js
import { CalculatorModel } from './modelo.js';
import { CalculatorView } from './vista.js';

class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Enlazamos de forma tradicional el manejador
        this.procesarEntrada = this.procesarEntrada.bind(this);

        // Le pasamos el callback a la vista de la forma clásica que pide el profesor
        this.view.setControladorCallback(this.procesarEntrada);
    }

    procesarEntrada(valor) {
        if (valor === "Borrar") {
            this.model.borrar();
        } else if (valor === "=") {
            this.model.calcular();
        } else {
            this.model.presionar(valor, this.view.obtenerValorPantalla());
        }
        
        // La vista se actualiza siempre reflejando el estado del modelo
        this.view.actualizarPantalla(this.model.obtenerOperacion());
    }
}

// Enfoque clásico de arranque de clase: Inicialización limpia al cargar el script
function inicializarApp() {
    let modelo = new CalculatorModel();
    // Buscamos el elemento que ya está declarado estáticamente en el HTML de la página
    let vista = document.querySelector("x-calculadora");
    
    if (vista) {
        let controlador = new CalculatorController(modelo, vista);
    }
}

// Ejecución directa de la función de arranque
inicializarApp();