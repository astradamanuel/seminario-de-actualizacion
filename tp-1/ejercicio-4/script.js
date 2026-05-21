/* 4. A partir del ejemplo proporcionado en la página
 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_chat&authuser=0 
Nótese que se trata de una representación HTML/CSS/JS que denota una sección de intercambio de 
mensajes de Chat. Construya una abstracción mediante WebComponents que encapsule esa interfaz y 
diseñe un método que permita insertar los mensajes intercambiados. */

class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderBase();
    }

    // Método para mensajes propios (Derecha - Estilo Darker)
    sendMessage(text, time) {
        this.addMessage(text, time, true);
    }

    // Método para mensajes recibidos (Izquierda)
    receiveMessage(text, time) {
        this.addMessage(text, time, false);
    }

    addMessage(texto, tiempo, esMio) {
        const contenedor = this.shadowRoot.querySelector('#chat-container');
        
        // Crear contenedor del mensaje
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('container');
        if (esMio) msgDiv.classList.add('darker');

        // Crear imagen
        const img = document.createElement('img');
        img.src = esMio 
            ? "https://www.w3schools.com/howto/img_avatar2.png" 
            : "https://www.w3schools.com/howto/img_avatar.png"; // Avatar de la foto
        img.alt = "Avatar";
        if (esMio) img.classList.add('right');

        // Crear párrafo del texto
        const p = document.createElement('p');
        p.innerText = texto;

        // Crear span del tiempo
        const span = document.createElement('span');
        span.classList.add(esMio ? 'time-left' : 'time-right');
        span.innerText = tiempo;

        // Ensamblar
        msgDiv.appendChild(img);
        msgDiv.appendChild(p);
        msgDiv.appendChild(span);
        contenedor.appendChild(msgDiv);
    }

    renderBase() {
        const style = document.createElement('style');
        style.textContent = `
            :host { display: block; font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; }
            
            .chat-window { 
                border: 3px solid #f1f1f1; 
                padding: 10px; 
                background: white;
            }

            .container {
                border: 2px solid #dedede;
                background-color: #f1f1f1;
                border-radius: 5px;
                padding: 10px;
                margin: 10px 0;
                overflow: hidden; /* Para limpiar el float */
            }

            /* Estilo para el mensaje de la derecha (oscuro) */
            .darker {
                border-color: #ccc;
                background-color: #ddd;
            }

            .container img {
                float: left;
                max-width: 60px;
                width: 100%;
                margin-right: 20px;
                border-radius: 50%;
            }

            .container img.right {
                float: right;
                margin-left: 20px;
                margin-right: 0;
            }

            .time-right {
                float: right;
                color: #aaa;
            }

            .time-left {
                float: left;
                color: #999;
            }

            h2 { font-weight: bold; margin-bottom: 20px; }
        `;

        const chatWindow = document.createElement('div');
        chatWindow.classList.add('chat-window');
        chatWindow.id = 'chat-container';

        const titulo = document.createElement('h2');
        titulo.innerText = "Chat Messages";

        chatWindow.appendChild(titulo);
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(chatWindow);
    }
}

customElements.define('chat-component', ChatComponent);

// --- LÓGICA EXTERNA (Función main sin flecha) ---

function main() {
    const miChat = document.querySelector('chat-component');
    
    if (miChat) {
        // Cargamos el diálogo de la foto
        miChat.receiveMessage("Hello. How are you today?", "11:00");
        miChat.sendMessage("Hey! I'm fine. Thanks for asking!", "11:01");
        miChat.receiveMessage("Sweet! So, what do you wanna do today?", "11:02");
        miChat.sendMessage("Nah, I dunno. Play soccer.. or learn more coding perhaps?", "11:05");
    }
}

window.onload = main;