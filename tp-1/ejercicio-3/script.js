/*  3. Observe la imagen adjuntada "ejercicio_3_equalizer". Construya el WebComponent correspondiente. 
Considere que el WebComponent internamente contiene una propiedad que se trata de un objeto de datos 
que posee toda la información representada en la imagen. El WebComponent debe tener un método llamado  
getData para obtener dichos datos y setData para asignarlos. El método setData debe aplicar 
instantánteamente las modificaciones visuales.*/

class EqualizadorGrafico extends HTMLElement {
    constructor() {
        super();
        // Datos basados en la imagen (frecuencias exactas)
        this.data = {
            "32Hz": 0, "64Hz": 0, "130Hz": 0, "260Hz": 0, "500Hz": 0,
            "1k": 0, "2k": 0, "4k": 0, "8.3k": 0, "16.5k": 0
        };
        this.sliders = [];
        this.manejarCambioSlider = this.manejarCambioSlider.bind(this);
    }

    connectedCallback() {
        this.render();
        this.conectarEventos();
    }

    disconnectedCallback() {
        this.desconectarEventos();
    }

    conectarEventos() {
        this.sliders.forEach(input => {
            input.addEventListener("input", this.manejarCambioSlider);
        });
    }

    desconectarEventos() {
        this.sliders.forEach(input => {
            input.removeEventListener("input", this.manejarCambioSlider);
        });
    }

    render() {
        this.innerHTML = "";
        this.sliders = [];

        // Contenedor principal estilo "ventana vieja"
        const panel = document.createElement("div");
        panel.style.cssText = `
            display: flex; background: #c0c0c0; padding: 15px;
            border: 2px solid; border-color: white black black white;
            font-family: sans-serif; width: fit-content;
        `;

        // Contenedor para los sliders
        const slidersContainer = document.createElement("div");
        slidersContainer.style.display = "flex";
        slidersContainer.style.gap = "5px";

        for (let freq in this.data) {
            const col = document.createElement("div");
            col.style.cssText = "display: flex; flex-direction: column; align-items: center; border: 1px solid gray; padding: 5px;";

            const labelTop = document.createElement("span");
            labelTop.innerText = freq;
            labelTop.style.fontSize = "12px";

            const input = document.createElement("input");
            input.type = "range";
            input.min = "-10";
            input.max = "10";
            input.value = this.data[freq];
            input.setAttribute("data-freq", freq);
            input.style.cssText = "writing-mode: bt-lr; -webkit-appearance: slider-vertical; height: 120px; width: 20px;";

            const labelBottom = document.createElement("span");
            labelBottom.innerText = `${this.data[freq] > 0 ? '+' : ''}${this.data[freq]}dB`;
            labelBottom.style.fontSize = "10px";

            col.appendChild(labelTop);
            col.appendChild(input);
            col.appendChild(labelBottom);
            slidersContainer.appendChild(col);
            this.sliders.push(input);
        }

        // Panel de botones laterales (OK, Cancel, etc.)
        const botonesContainer = document.createElement("div");
        botonesContainer.style.cssText = "display: flex; flex-direction: column; gap: 5px; margin-left: 15px;";
        
        ["OK", "Cancel", "Audition", "Help"].forEach(texto => {
            const btn = document.createElement("button");
            btn.innerText = texto;
            btn.style.width = "80px";
            botonesContainer.appendChild(btn);
        });

        panel.appendChild(slidersContainer);
        panel.appendChild(botonesContainer);
        this.appendChild(panel);
    }

    manejarCambioSlider(e) {
        const freq = e.target.getAttribute("data-freq");
        const valor = parseInt(e.target.value);
        this.data[freq] = valor;
        // Actualiza el texto de los dB que está debajo del input
        e.target.nextElementSibling.innerText = `${valor > 0 ? '+' : ''}${valor}dB`;
    }

    getData() {
        return { ...this.data };
    }

    setData(newData) {
        this.data = newData;
        if (this.isConnected) {
            this.desconectarEventos();
            this.render();
            this.conectarEventos();
        }
    }
}

customElements.define("equalizador-grafico", EqualizadorGrafico);