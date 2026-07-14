// modelo.js
export class CalculatorModel {
    constructor() {
        this.operacionActual = "";
    }

    presionar(valor, pantallaValor) {
        if (pantallaValor === "0" && valor !== ".") {
            this.operacionActual = valor;
        } else {
            this.operacionActual += valor;
        }
    }

    calcular() {
        try {
            let resultado = eval(this.operacionActual);
            this.operacionActual = resultado.toString();
        } catch (error) {
            this.operacionActual = "Error";
        }
    }

    borrar() {
        this.operacionActual = "";
    }

    obtenerOperacion() {
        return this.operacionActual || "0";
    }
}