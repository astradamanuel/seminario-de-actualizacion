/* 4. A partir del ejemplo proporcionado en la página
 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_chat&authuser=0 
Nótese que se trata de una representación HTML/CSS/JS que denota una sección de intercambio de 
mensajes de Chat. Construya una abstracción mediante WebComponents que encapsule esa interfaz y 
diseñe un método que permita insertar los mensajes intercambiados. */

class ChatWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, Helvetica, sans-serif;
          max-width: 400px;
        }
        .container {
          border: 2px solid #dedede;
          background-color: #f1f1f1;
          border-radius: 5px;
          padding: 10px;
          margin: 10px 0;
          display: flex;
          flex-direction: column;
        }
        .darker {
          border-color: #ccc;
          background-color: #ddd;
          align-items: flex-end;
          text-align: right;
        }
        .container img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 0 15px 0 0;
        }
        .darker img {
          margin: 0 0 0 15px;
          order: 1;
        }
        .time-right {
          color: #aaa;
          font-size: 12px;
        }
        .time-left {
          color: #999;
          font-size: 12px;
        }
        #chat-messages {
          display: flex;
          flex-direction: column;
        }
        .msg-content {
          flex-grow: 1;
        }
      </style>
      <div id="chat-messages">
        <!-- Los mensajes se insertarán aquí -->
      </div>
    `;
  }

  /**
   * Método para insertar mensajes dinámicamente
   * @param {string} text - El contenido del mensaje
   * @param {string} time - La hora del mensaje
   * @param {string} imgUrl - URL del avatar
   * @param {boolean} isRight - Si el mensaje debe ir a la derecha (estilo darker)
   */
  appendMessage(text, time, imgUrl, isRight = false) {
    const container = this.shadowRoot.querySelector('#chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `container ${isRight ? 'darker' : ''}`;
    
    messageDiv.innerHTML = `
      <img src="${imgUrl}" alt="Avatar">
      <div class="msg-content">
        <p>${text}</p>
        <span class="${isRight ? 'time-left' : 'time-right'}">${time}</span>
      </div>
    `;
    
    container.appendChild(messageDiv);
  }
}

// Registro del componente
customElements.define('chat-window', ChatWindow);