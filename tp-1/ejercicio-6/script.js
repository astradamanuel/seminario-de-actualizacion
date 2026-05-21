/* 6. Desarrolle un WebComponent que represente toda la información de los datos 
metereológicos de Mar del Plata tal como se muestra en la imagen. En este caso, considere 
agregar un método al WebComponent que le permita obtener el conjunto de todos los promedios de 
todas las temperaturas representadas. */

class ClimaMDP extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Datos extraídos de Captura de pantalla 2026-05-12 a la(s) 7.05.17 p. m.
    this.datos = {
      meses: ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic.", "Anual"],
      tempMaxAbs: [42.4, 38.1, 36.3, 32.5, 27.4, 22.2, 27.7, 24.7, 28.8, 34.4, 35.7, 39.4, 39.4],
      tempMaxMedia: [26.3, 25.8, 23.7, 20.5, 16.8, 13.8, 13.1, 14.4, 16.0, 18.5, 21.7, 24.4, 19.6],
      tempMedia: [20.3, 19.9, 18.0, 14.6, 11.3, 8.5, 8.1, 8.9, 10.5, 13.1, 15.9, 18.5, 14.0],
      tempMinMedia: [14.3, 14.1, 12.5, 9.1, 6.4, 4.1, 3.8, 4.0, 5.3, 7.6, 10.1, 12.7, 8.7],
      tempMinAbs: [4.7, 1.2, 1.9, -1.0, -3.0, -5.5, -9.3, -6.4, -5.5, -3.0, -2.0, -0.2, -9.3],
      precipitacion: [100.1, 72.8, 107.0, 73.3, 73.5, 54.9, 58.9, 64.0, 56.4, 83.4, 75.3, 104.0, 923.6],
      diasPrecip: [9, 8, 9, 9, 9, 9, 9, 8, 7, 10, 10, 10, 107],
      horasSol: [288.3, 234.5, 232.5, 195.0, 167.4, 120.0, 127.1, 164.3, 174.0, 210.8, 222.0, 269.7, 2405.6],
      humedad: [76, 77, 79, 81, 83, 84, 81, 81, 80, 80, 77, 76, 80]
    };
  }

  connectedCallback() {
    this.render();
  }

  // Método solicitado: Obtiene el promedio de todas las temperaturas representadas (sin incluir la columna 'Anual')
  getPromediosTemperaturas() {
    const categoriasTemp = [
      this.datos.tempMaxAbs,
      this.datos.tempMaxMedia,
      this.datos.tempMedia,
      this.datos.tempMinMedia,
      this.datos.tempMinAbs
    ];

    return categoriasTemp.map(categoria => {
      const soloMeses = categoria.slice(0, 12);
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
        /* Colores aproximados basados en la imagen */
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
        ${this.generateRow("Temp. máx. abs. (°C)", this.datos.tempMaxAbs, "temp-max-abs")}
        ${this.generateRow("Temp. máx. media (°C)", this.datos.tempMaxMedia, "temp-max-med")}
        ${this.generateRow("Temp. media (°C)", this.datos.tempMedia, "temp-med")}
        ${this.generateRow("Temp. mín. media (°C)", this.datos.tempMinMedia, "temp-min-med")}
        ${this.generateRow("Temp. mín. abs. (°C)", this.datos.tempMinAbs, "temp-min-abs")}
        ${this.generateRow("Precipitación total (mm)", this.datos.precipitacion, "precip")}
        ${this.generateRow("Días de precipitaciones", this.datos.diasPrecip, "dias-precip")}
        ${this.generateRow("Horas de sol", this.datos.horasSol, "horas-sol")}
        ${this.generateRow("Humedad relativa (%)", this.datos.humedad, "humedad")}
      </table>
    `;
  }

  generateRow(label, data, className) {
    return `
      <tr>
        <td class="label-row">${label}</td>
        ${data.map((val, index) => `<td class="${index === 12 ? 'header-clima' : className}">${val}</td>`).join('')}
      </tr>
    `;
  }
}

customElements.define('clima-mdp', ClimaMDP);