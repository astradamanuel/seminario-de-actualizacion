// modelo.js
export class CalculadoraModelo {
    constructor() {
        this.operacionActual = "";
    }

    // Va acumulando los números y operadores en el string
    agregarValor(valor) {
        if (this.operacionActual === "0" && valor !== ".") {
            this.operacionActual = valor;
        } else {
            this.operacionActual += valor;
        }
    }

    // Resuelve la operación matemáticamente
    calcular() {
        try {
            let resultado = eval(this.operacionActual);
            this.operacionActual = resultado.toString();
        } catch {
            this.operacionActual = "Error";
        }
    }

    // Resetea la memoria
    limpiar() {
        this.operacionActual = "";
    }

    // Le devuelve el estado actual al controlador
    getResultado() {
        return this.operacionActual === "" ? "0" : this.operacionActual;
    }
}