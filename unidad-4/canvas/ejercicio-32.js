// Integración: Tomando la integración anterior, implemente un manejador de eventos que le permita obtener la
// posición del mouse sobre el área de dibujo y que al hacer click sobre el área, el controlador solicite la carga de la
// figura que indique el selector en ese momento para ser dibujada específicamente en la coordenada del click.
// Adecúe el WebComponent para que el renderizado utilice una operación de traslación ( save(), translate(x, y) y
// restore()) para realizar el dibujado de cualquier figura seleccionable.

let miModelo32 = null;
let miControlador32 = null;
let contenedorEj32 = null;

function iniciarEjercicio32() {
    if (contenedorEj32) {
        contenedorEj32.remove();
    }

    contenedorEj32 = document.createElement('div');
    contenedorEj32.style.marginTop = '20px';

    let titulo = document.createElement('h2');
    titulo.innerText = 'Ejercicio 32';
    contenedorEj32.appendChild(titulo);

    // Instanciación directa del WebComponent
    let vista = new View();
    contenedorEj32.appendChild(vista);

    // Inicialización del MVC
    miModelo32 = new Model();
    miControlador32 = new Controller(vista, miModelo32);
    miControlador32.enable();

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

    let btnLimpiar = document.createElement('button');
    btnLimpiar.innerText = 'Limpiar Canvas';
    btnLimpiar.style.padding = '8px 12px';

    // 4. MANEJADOR DE EVENTOS DE CLIC EN EL ÁREA DE DIBUJO (Canvas)
    vista.addEventListener('request', function(e) {
        if (e.detail.tipo === 'canvasClick') {
            var xClick = e.detail.x;
            var yClick = e.detail.y;
            var tipoSeleccionado = selectFigura.value;

            // Creamos el JSON dinámico usando las coordenadas exactas del clic del mouse
            var ejemploJson = '';
            if (tipoSeleccionado === 'circulo') {
                ejemploJson = '{"tipo": "circulo", "x": ' + xClick + ', "y": ' + yClick + ', "radio": 80}';
            } else if (tipoSeleccionado === 'poligono') {
                ejemploJson = '{"tipo": "poligono", "x": ' + xClick + ', "y": ' + yClick + ', "puntos": [{"x":0,"y":-50},{"x":50,"y":50},{"x":-50,"y":50}]}';
            } else if (tipoSeleccionado === 'cakeGraph') {
                ejemploJson = '{"tipo": "cakeGraph", "x": ' + xClick + ', "y": ' + yClick + ', "radio": 100, "valores": [40, 30, 30]}';
            } else if (tipoSeleccionado === 'imagen') {
                ejemploJson = '{"tipo": "imagen", "url": "https://picsum.photos/200/300", "x": ' + xClick + ', "y": ' + yClick + ', "ancho": 200, "alto": 200}';
            }

            // Abrimos el prompt indicando que se dibujará en la posición donde hizo click
            var inputJson = prompt("Ingrese el JSON para dibujar en (" + Math.round(xClick) + ", " + Math.round(yClick) + "):", ejemploJson);
            
            if (!inputJson) return; // Si cancela, salimos

            try {
                var figura = JSON.parse(inputJson);

                // Validamos que el JSON coincida con el selector
                if (figura.tipo !== tipoSeleccionado) {
                    alert("Error: El JSON ingresado pertenece a un \"" + figura.tipo + "\", pero en el selector elegiste \"" + tipoSeleccionado + "\".");
                    return;
                }

                // Forzamos/aseguramos que las coordenadas coincidan exactamente con el clic
                figura.x = xClick;
                figura.y = yClick;

                // Inyectamos grosor y estilo de línea de los inputs
                figura.grosor = parseFloat(inputGrosor.value) || 1.0;
                figura.estiloLinea = inputEstiloLinea.value || 'continua';

                // Enviamos al controlador para agregar la figura
                vista.dispatchEvent(new CustomEvent('request', { 
                    detail: { tipo: 'agregar', data: figura } 
                }));

            } catch (error) {
                alert("Error: El texto ingresado no es un JSON válido.");
                console.error(error);
            }
        }
    });

    btnLimpiar.onclick = function() {
        vista.dispatchEvent(new CustomEvent('request', { 
            detail: { tipo: 'limpiar' } 
        }));
    };
    
    // Agregamos todo al contenedor de controles (ya no hace falta el botón de cargar tradicional)
    divControles.appendChild(inputGrosor);
    divControles.appendChild(inputEstiloLinea);
    divControles.appendChild(selectFigura);
    divControles.appendChild(btnLimpiar);
    contenedorEj32.appendChild(divControles);

    document.body.appendChild(contenedorEj32);
}