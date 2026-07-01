// script.js
import { CalculadoraModelo } from './modelo.js';
import { CalculadoraVista } from './vista.js'; // Ejecuta el registro del componente

class CalculadoraControlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.conectarEventos();
    }

    conectarEventos() {
        // El controlador se sienta a escuchar lo que la vista despacha
        this.vista.addEventListener('accion-calculadora', (evento) => {
            const botonPresionado = evento.detail.accion;
            this.procesarAccion(botonPresionado);
        });
    }

    procesarAccion(accion) {
        if (accion === 'Borrar') {
            this.modelo.limpiar();
        } else if (accion === '=') {
            this.modelo.calcular();
        } else {
            this.modelo.agregarValor(accion);
        }

        // Sincronizamos el estado del modelo con lo que ve el usuario
        const nuevoResultado = this.modelo.getResultado();
        this.vista.actualizarPantalla(nuevoResultado);
    }
}

// ARRANQUE SEGURO: Esperamos a que 'x-calculadora' esté lista en los customElements
customElements.whenDefined('x-calculadora').then(() => {
    const modelo = new CalculadoraModelo();
    const vista = document.querySelector('x-calculadora');
    
    // Inyección de dependencias pura
    const app = new CalculadoraControlador(modelo, vista);
});