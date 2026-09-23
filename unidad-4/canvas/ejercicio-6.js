// Integración: Modificar el WebComponent de modo que el modelo le permita agregar 
// dinámicamente (círculos y polígonos) ubicables en cualquier punto (x,y) del área de dibujo, 
// como así también, limpiar toda el área de dibujo. El componente tendrá que tener un 
// botón de carga de figuras, que al realizar click, lance un prompt esperando el objeto JSON 
// para representarlo inmediatamente en el canvas. También deberá tener un botón de limpieza.

let miModelo6 = null;
let miControlador6 = null;
let contenedorEj6 = null;

function iniciarEjercicio6() {
    if (contenedorEj6) {
        contenedorEj6.remove();
    }

    contenedorEj6 = document.createElement('div');
    contenedorEj6.style.marginTop = '20px';

    let titulo = document.createElement('h2');
    titulo.innerText = 'Ejercicio 6';
    contenedorEj6.appendChild(titulo);

    // Instanciación directa del WebComponent
    let vista = new View();
    contenedorEj6.appendChild(vista);

    // Inicialización del MVC
    miModelo6 = new Model();
    miControlador6 = new Controller(vista, miModelo6);
    miControlador6.enable();

    // Creación de la barra de controles
    let divControles = document.createElement('div');
    divControles.style.marginTop = '10px';

    let btnCargar = document.createElement('button');
    btnCargar.innerText = 'Cargar Figura (JSON)';
    btnCargar.style.marginRight = '10px';
    btnCargar.style.padding = '8px 12px';

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';
    btnLimpiar.style.padding = '8px 12px';

    divControles.appendChild(btnCargar);
    divControles.appendChild(btnLimpiar);
    contenedorEj6.appendChild(divControles);

    // Eventos de interacción
    btnCargar.onclick = function() {
        let jsonStr = prompt('Ingresá el objeto JSON de la figura:');
        if (jsonStr) {
            try {
                let figura = JSON.parse(jsonStr);
                vista.dispatchEvent(new CustomEvent('request', { 
                    detail: { tipo: 'agregar', data: figura } 
                }));
            } catch (e) {
                alert("JSON inválido");
            }
        }
    };

    btnLimpiar.onclick = function() {
        vista.dispatchEvent(new CustomEvent('request', { 
            detail: { tipo: 'limpiar' } 
        }));
    };

    document.body.appendChild(contenedorEj6);
}