/* 7. Extienda el WebComponent desarrollado en el punto anterior, y agregue un botón 
que permita alternar la visualización de temperaturas de (ºC) a (ºF) y viceversa. */

class ClimaExtendido extends ClimaMDP {
    constructor() {
        super(); // Llama al constructor de ClimaMDP, dibujando la tabla base de forma segura
        this.esCelsius = true;

        // Enlazamos el método de actualización al contexto de la clase
        this.conmutarTemperatura = this.conmutarTemperatura.bind(this);

        // Agregamos el botón de manera tradicional
        this.agregarBoton();
    }

    connectedCallback() {
        // Queda vacío o solo para eventos externos si hiciera falta.
        // Cumple con la regla de "no aplicar renderización ni delegarla" aquí.
    }

    agregarBoton() {
        let btn = document.createElement('button');
        btn.id = "btn-conversor";
        btn.textContent = "Cambiar a ºF";
        btn.style.cssText = "margin: 10px; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;";
        
        // Asignamos el evento con una función tradicional vinculada
        btn.onclick = this.conmutarTemperatura;

        // Insertamos el botón al principio del shadowRoot de forma ultra-compatible
        this.shadowRoot.insertBefore(btn, this.shadowRoot.firstChild);
    }

    conmutarTemperatura(evento) {
        let btn = evento.target;
        this.esCelsius = !this.esCelsius;
        
        if (this.esCelsius) {
            btn.textContent = "Cambiar a ºF";
        } else {
            btn.textContent = "Cambiar a ºC";
        }

        this.actualizarValores();
    }

    actualizarValores() {
        // Obtenemos todas las filas de la tabla dentro del shadowRoot
        let filasTabla = this.shadowRoot.querySelectorAll('tr');

        // Empezamos desde i = 1 para saltarnos la fila del encabezado (Meses)
        for (let i = 1; i < filasTabla.length; i++) {
            let tr = filasTabla[i];
            
            // Buscamos la fila de datos correspondiente en nuestro objeto (desfasado por el header)
            let filaDatos = this.datos.filas[i - 1];

            // Si es una fila de temperatura, convertimos sus valores
            if (filaDatos.label.indexOf("Temp") !== -1) {
                let celdas = tr.querySelectorAll('td');

                // Recorremos las celdas de datos (empezando en 1 para saltar la etiqueta del nombre de la fila)
                for (let j = 1; j < celdas.length; j++) {
                    let celda = celdas[j];
                    let valorCelsius = filaDatos.data[j - 1]; // -1 porque el array data no tiene la etiqueta

                    if (this.esCelsius) {
                        celda.textContent = valorCelsius;
                    } else {
                        // Fórmula clásica: (C * 9/5) + 32
                        let fahrenheit = (valorCelsius * 9 / 5) + 32;
                        celda.textContent = fahrenheit.toFixed(1);
                    }
                }
            }
        }
    }
}

customElements.define('clima-extendido', ClimaExtendido);