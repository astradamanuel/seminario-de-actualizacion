/* 7. Extienda el WebComponent desarrollado en el punto anterior, y agregue un botón 
que permita alternar la visualización de temperaturas de (ºC) a (ºF) y viceversa. */

class ClimaExtendido extends ClimaMDP {
    constructor() {
        super();
        this.esCelsius = true;
    }

    // Usamos este método para no romper el render original
    connectedCallback() {
        super.connectedCallback(); // Esto dibuja la tabla original
        this.agregarBoton();
    }

    agregarBoton() {
        const btn = document.createElement('button');
        btn.textContent = "Cambiar a ºF";
        btn.style.cssText = "margin: 10px; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;";
        
        btn.onclick = () => {
            this.esCelsius = !this.esCelsius;
            btn.textContent = this.esCelsius ? "Cambiar a ºF" : "Cambiar a ºC";
            this.actualizarValores();
        };

        // Insertamos el botón antes de la tabla en el Shadow DOM
        this.shadowRoot.prepend(btn);
    }

    actualizarValores() {
        const celdas = this.shadowRoot.querySelectorAll('td:not(.label-row)');
        
        this.datos.filas.forEach((fila, filaIndex) => {
            // Solo convertimos si es una fila de Temperatura
            if (fila.label.includes("Temp")) {
                const tr = this.shadowRoot.querySelectorAll('tr')[filaIndex + 1]; // +1 por el header
                const celdasFila = tr.querySelectorAll('td:not(.label-row)');
                
                celdasFila.forEach((celda, i) => {
                    const valorCelsius = fila.data[i];
                    if (this.esCelsius) {
                        celda.textContent = valorCelsius;
                    } else {
                        const fahrenheit = (valorCelsius * 9/5) + 32;
                        celda.textContent = fahrenheit.toFixed(1);
                    }
                });
            }
        });
    }
}

customElements.define('clima-extendido', ClimaExtendido);