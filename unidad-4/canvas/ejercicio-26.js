// Integración: Extienda el WebComponent desarrollado de modo que el selector ofrezca la posibilidad de cargar
// imágenes. El modo de carga se realizaría mediante URL válida.


let miModelo26 = null;
let miControlador26 = null;
let contenedorEj26 = null;

function iniciarEjercicio26() {
    if (contenedorEj26) {
        contenedorEj26.remove();
    }

    contenedorEj26 = document.createElement('div');
    contenedorEj26.style.marginTop = '20px';

    let titulo = document.createElement('h2');
    titulo.innerText = 'Ejercicio 26';
    contenedorEj26.appendChild(titulo);

    // Instanciación directa del WebComponent
    let vista = new View();
    contenedorEj26.appendChild(vista);

    // Inicialización del MVC
    miModelo26 = new Model();
    miControlador26 = new Controller(vista, miModelo26);
    miControlador26.enable();

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

    // 1. Crear el elemento select
    let selectFigura = document.createElement('select');
    selectFigura.style.marginRight = '10px';
    selectFigura.style.padding = '8px 12px';

    // 2. Opciones
    let opciones = [
        { valor: 'circulo', texto: 'Círculo' },
        { valor: 'poligono', texto: 'Polígono' },
        { valor: 'cakeGraph', texto: 'Gráfico de Torta (cakeGraph)' },
        { valor: 'imagen', texto: 'Imagen (URL)' },
    ];

    // 3. Recorrer las opciones y agregarlas al select
    opciones.forEach(op => {
        let optionEl = document.createElement('option');
        optionEl.value = op.valor;
        optionEl.text = op.texto;
        selectFigura.appendChild(optionEl);
    });

    let btnCargar = document.createElement('button');
    btnCargar.innerText = 'Cargar Figura (JSON)';
    btnCargar.style.marginRight = '10px';
    btnCargar.style.padding = '8px 12px';

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';
    btnLimpiar.style.padding = '8px 12px';

    // 4. Asignar evento para cargar
    btnCargar.onclick = function() {
        var tipoSeleccionado = selectFigura.value;

        // Creo un mensaje y ejemplo de JSON dinámico según la opción elegida
        var ejemploJson = '';
        if (tipoSeleccionado === 'circulo') {
            ejemploJson = '{"tipo": "circulo", "x": 250, "y": 200, "radio": 80}';
        } else if (tipoSeleccionado === 'poligono') {
            ejemploJson = '{"tipo": "poligono", "puntos": [{"x":100,"y":150},{"x":200,"y":100},{"x":150,"y":250}]}';
        } else if (tipoSeleccionado === 'cakeGraph') {
            ejemploJson = '{"tipo": "cakeGraph", "x": 300, "y": 200, "radio": 100, "valores": [40, 30, 30]}';
        } else if (tipoSeleccionado === 'imagen') {
            ejemploJson = '{"tipo": "imagen", "url": "https://picsum.photos/200/300", "x": 100, "y": 100, "ancho": 200, "alto": 200}';
        }
        
        // Se abre el prompt guiando al usuario con el ejemplo correspondiente
        var inputJson = prompt("Ingrese el JSON para el tipo seleccionado (" + tipoSeleccionado + "):", ejemploJson);
        
        if (!inputJson) return; // Si el usuario cancela, salimos

        try {
            var figura = JSON.parse(inputJson);

            // Valido que el JSON coincida con lo elegido en el <select>
            if (figura.tipo !== tipoSeleccionado) {
                alert("Error: El JSON ingresado pertenece a un \"" + figura.tipo + "\", pero en el selector elegiste \"" + tipoSeleccionado + "\". Deben coincidir.");
                return;
            }

            // Inyecto grosor y estilo de línea desde los inputs visuales
            figura.grosor = parseFloat(inputGrosor.value) || 1.0;
            figura.estiloLinea = inputEstiloLinea.value || 'continua';

            // Envio al controlador utilizando exactamente la estructura { tipo, data } que espera
            vista.dispatchEvent(new CustomEvent('request', { 
                detail: { tipo: 'agregar', data: figura } 
            }));

        } catch (error) {
            alert("Error: El texto ingresado no es un JSON válido.");
            console.error(error);
        }
    };

    btnLimpiar.onclick = function() {
        vista.dispatchEvent(new CustomEvent('request', { 
            detail: { tipo: 'limpiar' } 
        }));
    };
    
    // Agregamos todo al contenedor de controles en orden visual prolijo
    divControles.appendChild(inputGrosor);
    divControles.appendChild(inputEstiloLinea);
    divControles.appendChild(selectFigura);
    divControles.appendChild(btnCargar);
    divControles.appendChild(btnLimpiar);
    contenedorEj26.appendChild(divControles);

    document.body.appendChild(contenedorEj26);
}