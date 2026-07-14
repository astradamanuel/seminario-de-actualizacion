/*  3. Observe la imagen adjuntada "ejercicio_3_equalizer". Construya el WebComponent correspondiente. 
Considere que el WebComponent internamente contiene una propiedad que se trata de un objeto de datos 
que posee toda la información representada en la imagen. El WebComponent debe tener un método llamado  
getData para obtener dichos datos y setData para asignarlos. El método setData debe aplicar 
instantánteamente las modificaciones visuales.*/

class EqualizadorGrafico extends HTMLElement {
    constructor() {
        super();

        this.data = {
            "32Hz": 0,
            "64Hz": 0,
            "130Hz": 0,
            "260Hz": 0,
            "500Hz": 0,
            "1k": 0,
            "2k": 0,
            "4k": 0,
            "8.3k": 0,
            "16.5k": 0
        };

        this.sliders = [];

        // Enlazamos el contexto de manera tradicional
        this.manejarCambioSlider = this.manejarCambioSlider.bind(this);

        // Panel principal
        this.panel = document.createElement("div");
        this.panel.style.cssText =
            "display:flex;" +
            "background:#c0c0c0;" +
            "padding:15px;" +
            "border:2px solid;" +
            "border-color:white black black white;" +
            "font-family:sans-serif;" +
            "width:fit-content;";

        // Contenedor de sliders
        this.slidersContainer = document.createElement("div");
        this.slidersContainer.style.display = "flex";
        this.slidersContainer.style.gap = "5px";

        for (let frecuencia in this.data) {

            let columna = document.createElement("div");
            columna.style.display = "flex";
            columna.style.flexDirection = "column";
            columna.style.alignItems = "center";
            columna.style.border = "1px solid gray";
            columna.style.padding = "5px";

            let lblFrecuencia = document.createElement("span");
            lblFrecuencia.innerText = frecuencia;
            lblFrecuencia.style.fontSize = "12px";

            let slider = document.createElement("input");
            slider.type = "range";
            slider.min = "-10";
            slider.max = "10";
            slider.value = this.data[frecuencia];
            slider.dataset.freq = frecuencia;
            slider.style.cssText =
                "writing-mode:bt-lr;" +
                "-webkit-appearance:slider-vertical;" +
                "height:120px;" +
                "width:20px;";

            let lblValor = document.createElement("span");
            lblValor.innerText = "0dB";
            lblValor.style.fontSize = "10px";

            columna.appendChild(lblFrecuencia);
            columna.appendChild(slider);
            columna.appendChild(lblValor);

            this.slidersContainer.appendChild(columna);

            this.sliders.push(slider);
        }

        // Botones laterales
        this.botonesContainer = document.createElement("div");
        this.botonesContainer.style.display = "flex";
        this.botonesContainer.style.flexDirection = "column";
        this.botonesContainer.style.gap = "5px";
        this.botonesContainer.style.marginLeft = "15px";

        let nombresBotones = ["OK", "Cancel", "Audition", "Help"];

        for (let nombre of nombresBotones) {
            let boton = document.createElement("button");
            boton.innerText = nombre;
            boton.style.width = "80px";
            this.botonesContainer.appendChild(boton);
        }

        this.panel.appendChild(this.slidersContainer);
        this.panel.appendChild(this.botonesContainer);

        this.appendChild(this.panel);
    }

    connectedCallback() {
        // Conexión directa y explícita de eventos, tal como pidió
        for (let slider of this.sliders) {
            slider.addEventListener("input", this.manejarCambioSlider);
        }
    }

    disconnectedCallback() {
        // Desconexión directa
        for (let slider of this.sliders) {
            slider.removeEventListener("input", this.manejarCambioSlider);
        }
    }

    manejarCambioSlider(evento) {
        let slider = evento.target;
        let frecuencia = slider.dataset.freq;
        let valor = parseInt(slider.value);

        this.data[frecuencia] = valor;

        slider.nextElementSibling.innerText =
            (valor > 0 ? "+" : "") + valor + "dB";
    }

    getData() {
        // Clonación tradicional para no devolver la referencia directa
        let copia = {};
        for (let clave in this.data) {
            copia[clave] = this.data[clave];
        }
        return copia;
    }

    setData(nuevoObjeto) {
        // Copiamos los valores nuevos de forma segura
        for (let clave in nuevoObjeto) {
            if (this.data.hasOwnProperty(clave)) {
                this.data[clave] = parseInt(nuevoObjeto[clave]) || 0;
            }
        }

        // Actualizamos la interfaz visual de inmediato
        for (let slider of this.sliders) {
            let frecuencia = slider.dataset.freq;
            let valor = this.data[frecuencia];

            slider.value = valor;
            slider.nextElementSibling.innerText =
                (valor > 0 ? "+" : "") + valor + "dB";
        }
    }
}

customElements.define("equalizador-grafico", EqualizadorGrafico);