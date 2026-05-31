/* 6. Desarrolle un WebComponent que represente toda la información de los datos 
metereológicos de Mar del Plata tal como se muestra en la imagen. En este caso, considere 
agregar un método al WebComponent que le permita obtener el conjunto de todos los promedios de 
todas las temperaturas representadas. */

class ClimaMDP extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.datos = {
      meses: ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic.", "Anual"],
      filas: [
        { label: "Temp. máx. abs. (°C)", data: [42.4, 38.1, 36.3, 32.5, 27.4, 22.2, 27.7, 24.7, 28.8, 34.4, 35.7, 39.4, 39.4], class: "temp-max-abs" },
        { label: "Temp. máx. media (°C)", data: [26.3, 25.8, 23.7, 20.5, 16.8, 13.8, 13.1, 14.4, 16.0, 18.5, 21.7, 24.4, 19.6], class: "temp-max-med" },
        { label: "Temp. media (°C)", data: [20.3, 19.9, 18.0, 14.6, 11.3, 8.5, 8.1, 8.9, 10.5, 13.1, 15.9, 18.5, 14.0], class: "temp-med" },
        { label: "Temp. mín. media (°C)", data: [14.3, 14.1, 12.5, 9.1, 6.4, 4.1, 3.8, 4.0, 5.3, 7.6, 10.1, 12.7, 8.7], class: "temp-min-med" },
        { label: "Temp. mín. abs. (°C)", data: [4.7, 1.2, 1.9, -1.0, -3.0, -5.5, -9.3, -6.4, -5.5, -3.0, -2.0, -0.2, -9.3], class: "temp-min-abs" },
        { label: "Precipitación total (mm)", data: [100.1, 72.8, 107.0, 73.3, 73.5, 54.9, 58.9, 64.0, 56.4, 83.4, 75.3, 104.0, 923.6], class: "precip" },
        { label: "Días de precipitaciones", data: [9, 8, 9, 9, 9, 9, 9, 8, 7, 10, 10, 10, 107], class: "dias-precip" },
        { label: "Horas de sol", data: [288.3, 234.5, 232.5, 195.0, 167.4, 120.0, 127.1, 164.3, 174.0, 210.8, 222.0, 269.7, 2405.6], class: "horas-sol" },
        { label: "Humedad relativa (%)", data: [76, 77, 79, 81, 83, 84, 81, 81, 80, 80, 77, 76, 80], class: "humedad" }
      ]
    };
  }

  connectedCallback() {
    this.render();
  }

  getPromediosTemperaturas() {
    return this.datos.filas
      .filter(f => f.label.includes("Temp"))
      .map(f => {
        const soloMeses = f.data.slice(0, 12);
        const suma = soloMeses.reduce((a, b) => a + b, 0);
        return parseFloat((suma / 12).toFixed(2));
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        table { border-collapse: collapse; font-family: sans-serif; font-size: 12px; width: 100%; text-align: center; }
        th, td { border: 1px solid #aaa; padding: 4px; }
        .header-clima { background: #f8f9fa; font-weight: bold; }
        .label-row { font-weight: bold; color: #0645ad; text-align: left; padding-left: 10px; }
        .temp-max-abs { background-color: #d73027; color: white; }
        .temp-max-med { background-color: #f46d43; }
        .temp-med { background-color: #fdae61; }
        .temp-min-med { background-color: #fee090; }
        .temp-min-abs { background-color: #e0f3f8; }
        .precip { background-color: #74add1; color: white; }
        .dias-precip { background-color: #abd9e9; }
        .horas-sol { background-color: #ffffbf; }
        .humedad { background-color: #4575b4; color: white; }
      </style>
      <table>
        <tr class="header-clima">
          <th>Mes</th>
          ${this.datos.meses.map(m => `<th>${m}</th>`).join('')}
        </tr>
        ${this.datos.filas.map(f => this.generateRow(f.label, f.data, f.class)).join('')}
      </table>
    `;
  }

  generateRow(label, data, className) {
    return `
      <tr>
        <td class="label-row">${label}</td>
        ${data.map((val, index) => `
          <td class="${index === 12 ? 'header-clima' : className}">${val}</td>
        `).join('')}
      </tr>
    `;
  }
}

customElements.define('clima-mdp', ClimaMDP);