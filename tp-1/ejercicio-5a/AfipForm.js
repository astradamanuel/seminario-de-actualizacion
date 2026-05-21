/* 5A. Desarrolle un WebComponent tipo "Formulario" que le permita cargar toda la información 
pertinente de la factura de AFIP adjuntada. Este WebComponent deberá tener un botón "Generar factura" 
que deberá abrir una pestaña nueva con una gráfica del diseño de la factura solicitada. */

class AfipForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.items = [{ cod: '', desc: '', cant: 1, precio: 0 }];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: sans-serif; padding: 20px; background: #f4f4f4; border-radius: 8px; }
        form { display: grid; gap: 10px; max-width: 600px; }
        .section { background: white; padding: 15px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h3 { margin-top: 0; color: #333; border-bottom: 2px solid #007bff; }
        label { display: block; font-size: 12px; font-weight: bold; margin-top: 8px; }
        input { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; }
        button { cursor: pointer; padding: 10px 20px; border: none; border-radius: 4px; font-weight: bold; }
        .btn-add { background: #28a745; color: white; margin-top: 10px; }
        .btn-generate { background: #007bff; color: white; font-size: 16px; margin-top: 20px; width: 100%; }
      </style>
      <form id="factura-form">
        <div class="section">
          <h3>Datos del Emisor y Comprobante</h3>
          <label>Punto de Venta</label><input type="text" id="pv" value="0002">
          <label>Nro. Comprobante</label><input type="text" id="nro" value="00000641">
          <label>Fecha Emisión</label><input type="date" id="fecha" value="2016-07-27">
        </div>

        <div class="section">
          <h3>Receptor</h3>
          <label>Razón Social</label><input type="text" id="r_social" value="INSTITUTO NACIONAL DE SERVICIOS SOCIALES...">
          <label>CUIT</label><input type="text" id="r_cuit" value="30522763922">
          <label>Domicilio</label><input type="text" id="r_domicilio" value="Peru 169 - CABA">
        </div>

        <div class="section" id="items-container">
          <h3>Ítems</h3>
          <div class="item-row">
            <input type="text" placeholder="Producto/Servicio" class="item-desc" value="UGL 6- CAPITA SALUD MENTAL">
            <input type="number" placeholder="Precio Unit." class="item-precio" value="264002.11">
          </div>
        </div>

        <button type="button" class="btn-generate" id="generate">GENERAR FACTURA</button>
      </form>
    `;

    this.shadowRoot.getElementById('generate').addEventListener('click', () => this.generateInvoice());
  }

  generateInvoice() {
    const data = {
      pv: this.shadowRoot.getElementById('pv').value,
      nro: this.shadowRoot.getElementById('nro').value,
      fecha: this.shadowRoot.getElementById('fecha').value,
      receptor: {
        nombre: this.shadowRoot.getElementById('r_social').value,
        cuit: this.shadowRoot.getElementById('r_cuit').value,
        dom: this.shadowRoot.getElementById('r_domicilio').value
      },
      items: Array.from(this.shadowRoot.querySelectorAll('.item-row')).map(row => ({
        desc: row.querySelector('.item-desc').value,
        precio: row.querySelector('.item-precio').value
      }))
    };

    const win = window.open('', '_blank');
    win.document.write(this.getInvoiceHTML(data));
    win.document.close();
  }

  getInvoiceHTML(data) {
    const total = data.items.reduce((acc, curr) => acc + parseFloat(curr.precio || 0), 0).toFixed(2);
    
    return `
      <html>
      <head>
        <title>Factura ${data.nro}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #000; }
          .border-box { border: 2px solid #000; padding: 10px; margin-bottom: -2px; }
          .header { display: flex; justify-content: space-between; }
          .tipo-comp { border: 2px solid #000; font-size: 40px; padding: 0 15px; position: absolute; left: 50%; transform: translateX(-50%); background: white; top: 10px; }
          .title-factura { font-size: 24px; font-weight: bold; text-align: right; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #ccc; border: 1px solid #000; padding: 5px; font-size: 12px; }
          td { border-left: 1px solid #000; border-right: 1px solid #000; padding: 8px; font-size: 12px; }
          .total-box { text-align: right; margin-top: 20px; font-weight: bold; font-size: 18px; }
          .afip-footer { margin-top: 50px; border-top: 2px solid #000; padding-top: 10px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="tipo-comp">B</div>
        <div class="border-box header">
          <div>
            <strong>Razón Social: Mi Empresa S.A.</strong><br>
            Domicilio: Av. Siempre Viva 123<br>
            IVA Responsable Inscripto
          </div>
          <div style="text-align: right;">
            <div class="title-factura">FACTURA</div>
            Punto de Venta: ${data.pv} Comp. Nro: ${data.nro}<br>
            Fecha: ${data.fecha}<br>
            CUIT: 30-12345678-9
          </div>
        </div>

        <div class="border-box">
          <strong>Receptor:</strong> ${data.receptor.nombre}<br>
          <strong>CUIT:</strong> ${data.receptor.cuit} | <strong>Condición IVA:</strong> Exento<br>
          <strong>Domicilio:</strong> ${data.receptor.dom}
        </div>

        <table>
          <thead>
            <tr>
              <th>Producto / Servicio</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(i => `
              <tr>
                <td>${i.desc}</td>
                <td style="text-align: center;">1,00</td>
                <td style="text-align: right;">$${i.precio}</td>
                <td style="text-align: right;">$${i.precio}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total-box">
          Importe Total: $${total}
        </div>

        <div class="afip-footer">
          <img src="https://www.afip.gob.ar/images/logo_afip.png" width="100" alt="AFIP">
          <div>CAE N°: 66304278833647 | Vto: 06/08/2016</div>
        </div>
      </body>
      </html>
    `;
  }
}

customElements.define('afip-form', AfipForm);