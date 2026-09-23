// Integración: Modificar el modelo del WebComponent integrado (Ej:6), de modo que las figuras gestionadas 
// admitan propiedades de tipo de línea y grosor. Para esto, el componente deberá tener dos inputs para 
// seleccionar el tipo de línea y el valor de grosor. Al hacer click en el botón de carga de figuras, se seguirá
// aceptando el mismo JSON sin cambios, solo anexará el valor de los inputs a la estructura de datos.

let miModelo12 = null;
let miControlador12 = null;
let contenedorEj12 = null;

function iniciarEjercicio12() {
    if (contenedorEj12) {
        contenedorEj12.remove();
    }

    contenedorEj12 = document.createElement('div');
    contenedorEj12.style.marginTop = '20px';

    let titulo = document.createElement('h2');
    titulo.innerText = 'Ejercicio 12';
    contenedorEj12.appendChild(titulo);

    // Instanciación directa del WebComponent
    let vista = new View();
    contenedorEj12.appendChild(vista);

    // Inicialización del MVC
    miModelo12 = new Model();
    miControlador12 = new Controller(vista, miModelo12);
    miControlador12.enable();

    // Creación de la barra de controles
    let divControles = document.createElement('div');
    divControles.style.marginTop = '10px';

    // Input para el Grosor de la línea
    let inputGrosor = document.createElement('input');
    inputGrosor.type = 'number'; 
    inputGrosor.placeholder = 'Grosor de línea (ej: 2)';
    inputGrosor.value = '1.0'; 
    inputGrosor.style.marginRight = '10px';
    inputGrosor.style.padding = '8px 12px';

    // Input para el Estilo de la línea
    let inputEstiloLinea = document.createElement('input');
    inputEstiloLinea.type = 'text'; 
    inputEstiloLinea.placeholder = 'Estilo de línea (ej: punteada)';
    inputEstiloLinea.style.marginRight = '10px';
    inputEstiloLinea.style.padding = '8px 12px';

    let btnCargar = document.createElement('button');
    btnCargar.innerText = 'Cargar Figura (JSON)';
    btnCargar.style.marginRight = '10px';
    btnCargar.style.padding = '8px 12px';

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';
    btnLimpiar.style.padding = '8px 12px';

    divControles.appendChild(inputGrosor);
    divControles.appendChild(inputEstiloLinea);
    divControles.appendChild(btnCargar);
    divControles.appendChild(btnLimpiar);
    contenedorEj12.appendChild(divControles);

    // Eventos de interacción
    btnCargar.onclick = function() {
        let jsonStr = prompt('Ingresá el objeto JSON de la figura:');
        if (jsonStr) {
            try {
                let figura = JSON.parse(jsonStr);

                // Anexamos el valor de los inputs al objeto figura
                figura.grosor = parseFloat(inputGrosor.value) || 1;
                figura.estiloLinea = inputEstiloLinea.value || 'continua';

                // Enviamos el pedido (request) al Controlador
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

    document.body.appendChild(contenedorEj12);
}