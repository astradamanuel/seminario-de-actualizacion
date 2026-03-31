let pantalla = document.getElementById('pantalla');
let operacionActual = "";

// Función para agregar números u operadores
function presionar(valor) {
    if (pantalla.value === "0" && valor !== ".") {
        operacionActual = valor;
    } else {
        operacionActual += valor;
    }
    actualizarPantalla();
}

// Función para limpiar la pantalla
function borrar() {
    operacionActual = "";
    pantalla.value = "0";
}

// Función para calcular el resultado
function calcular() {
    try {
        // eval() procesa el string como una operación matemática
        let resultado = eval(operacionActual);
        operacionActual = resultado.toString();
        actualizarPantalla();
    } catch (error) {
        pantalla.value = "Error";
        operacionActual = "";
    }
}

function actualizarPantalla() {
    pantalla.value = operacionActual;
}