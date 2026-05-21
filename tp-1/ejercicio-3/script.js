/*  3. Observe la imagen adjuntada "ejercicio_3_equalizer". Construya el WebComponent correspondiente. 
Considere que el WebComponent internamente contiene una propiedad que se trata de un objeto de datos 
que posee toda la información representada en la imagen. El WebComponent debe tener un método llamado  
getData para obtener dichos datos y setData para asignarlos. El método setData debe aplicar 
instantánteamente las modificaciones visuales.*/

class GraphicEQ extends HTMLElement {

    constructor() {
        super();

        // Estado interno del componente
        this.data = {
            "32Hz": 0,
            "64Hz": 0,
            "130Hz": 0,
            "260Hz": 0,
            "500Hz": 0,
            "1k": 0,
            "2k": 0,
            "4k": 0,
            "8k": 0,
            "16k": 0
        };
    }

    connectedCallback() {
        this.render();
    }

    // Método para dibujar el componente
    render() {

        let slidersHTML = "";

        // Recorrer objeto data
        for (let frecuencia in this.data) {

            slidersHTML += `
                <div style="display:flex; flex-direction:column; align-items:center; margin:10px;">
                    
                    <label>${frecuencia}</label>

                    <input 
                        type="range"
                        min="-10"
                        max="10"
                        value="${this.data[frecuencia]}"
                        orient="vertical"
                        style="writing-mode: bt-lr; -webkit-appearance: slider-vertical; height:150px;"
                    >

                    <span>${this.data[frecuencia]} dB</span>

                </div>
            `;
        }

        this.innerHTML = `
            <div style="display:flex; border:2px solid gray; padding:20px;">
                ${slidersHTML}
            </div>
        `;
    }

    // Obtener datos
    getData() {
        return this.data;
    }

    // Modificar datos
    setData(newData) {

        this.data = newData;

        // Actualizar visual instantáneamente
        this.render();
    }
}

// Registrar componente
customElements.define("graphic-eq", GraphicEQ);