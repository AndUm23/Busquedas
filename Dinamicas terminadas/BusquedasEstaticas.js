import Busquedas from "./Busquedas.js";
import Estructura from "./Estructura.js";
import Registro from "./Registro.js";
import {ValidarEstructura, CargarEstructuraGuardada} from './CargarEstructura.js';


const cargarEstructuraPanel = document.getElementById("cargarEstructuraPanel");
const cargarEstructuraButton = document.getElementById("cargarEstructuraButton");
const noCargarEstructuraButton = document.getElementById("noCargarEstructuraButton");

const tamañoEstructuraPanel = document.getElementById("tamañoEstructuraPanel");
const tamañoEstructuraInput = document.getElementById("tamañoEstructuraInput");
const crearEstructuraButton = document.getElementById("crearEstructuraButton");
const reiniciarEstructuraButton = document.getElementById("reiniciarEstructuraButton");

const tamañoClavePanel = document.getElementById("tamañoClavePanel");
const tamañoClaveInput = document.getElementById("tamañoClaveInput");
const definirLongitudClaveButton = document.getElementById("definirLongitudClaveButton");

const insertarClavePanel = document.getElementById("insertarClavePanel");
const claveInput = document.getElementById("claveInput");
const insertarClaveButton = document.getElementById("insertarClaveButton");

const eliminarClaveButton = document.getElementById("eliminarClaveButton");


// -------------------------------------------------------------
const tabla = document.getElementById("tabla");
const tablaOrdenada = document.getElementById("tablaOrdenada");
const busquedaPanel = document.getElementById("busquedaPanel");

const busquedaSecuencialRadio = document.getElementById("busquedaSecuencial");
const busquedaBinariaRadio = document.getElementById("busquedaBinaria");
const busquedaBloquesRadio = document.getElementById("busquedaBloques");

const claveBusquedaInput = document.getElementById("claveBusqueda");
const buscarButton = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

let tamañoEstructura = 0;
let tamañoBloque = 0;
let longitudClave = 0;

let estructura = new Estructura();
let estructuraOrdenada = new Estructura();

let busquedas = new Busquedas();

// -------------------------------Estructura encontrada--------------------------
let estructuraEncontrada = ValidarEstructura();
if (estructuraEncontrada != null) {
    if (estructuraEncontrada.clavesInsertadas > 0) {
        cargarEstructuraPanel.style.display = "block";
    } else {
        cargarEstructuraPanel.style.display = "none";
        tamañoEstructuraPanel.style.display = "block";
    }
} else {
    cargarEstructuraPanel.style.display = "none";
    tamañoEstructuraPanel.style.display = "block";
} cargarEstructuraButton.addEventListener("click", () => {
    estructura = CargarEstructuraGuardada();
    estructuraOrdenada = CargarEstructuraGuardada();
    tamañoEstructura = estructura.tamaño;

    configurarEstructura(tamañoEstructura);

    longitudClave = estructura.longitudClave;

    cargarEstructuraPanel.style.display = "none";

    tamañoEstructuraPanel.style.display = "block";
    tamañoEstructuraInput.disabled = true;
    tamañoEstructuraInput.value = estructura.tamaño;
    tamañoClavePanel.style.display = "block";

    tamañoClaveInput.disabled = true;
    tamañoClaveInput.value = longitudClave;
    definirLongitudClaveButton.disabled = true;

    crearEstructuraButton.disabled = true;
    reiniciarEstructuraButton.disabled = false;
    insertarClavePanel.style.display = "block";
    eliminarClaveButton.disabled = false;
    busquedaPanel.style.display = "block";

    mostrarTablaOrdenada();


});

noCargarEstructuraButton.addEventListener("click", () => {

    cargarEstructuraPanel.style.display = "none";
    tamañoEstructuraPanel.style.display = "block";
});
// ---------------------------------CIERRE CARGAR ESTRUCTURA--------------------------------------


// -------------------------------------Creación estructura (no cargada)---------------------------
tamañoEstructuraInput.addEventListener("input", () => {
    if (tamañoEstructuraInput.value > 0) {
        crearEstructuraButton.disabled = false;
    } else {
        crearEstructuraButton.disabled = true;
    }
});

// Después de ingresar el tamaño de la estructura
crearEstructuraButton.addEventListener("click", () => {
    tamañoEstructura = parseInt(tamañoEstructuraInput.value);
    if (tamañoEstructuraInput.value == "" || tamañoEstructura < 1) {
        alert("Ingrese un tamaño positivo mayor a 0.");
    } else {
        estructura.inicializarEstructura(tamañoEstructura);
        configurarEstructura(tamañoEstructura);
        tamañoClavePanel.style.display = "block";
        crearEstructuraButton.disabled = true;
        tamañoEstructuraInput.disabled = true;
        reiniciarEstructuraButton.disabled = false;
    }

});

function configurarEstructura(tamaño) { // Inicializa la estructura
    estructura.tamaño = tamaño;
    estructuraOrdenada.tamaño = tamaño;
    tamañoBloque = Math.sqrt(tamaño);
}

// Después de ingresar la longitud de las claves
definirLongitudClaveButton.addEventListener("click", () => {
    longitudClave = parseInt(tamañoClaveInput.value);

    if (tamañoClaveInput.value == "" || longitudClave < 1 || longitudClave > 10) {
        alert("Ingrese una longitud de clave entre 1 y 10");
    } else {

        insertarClavePanel.style.display = "block";
        definirLongitudClaveButton.disabled = true;
        tamañoClaveInput.disabled = true;
        // Setea la longitud
        estructura.longitudClave = longitudClave;
    }
});

// -------------------------------------CIERRE CREACIÖN ESTRUCTURA------------------------------

// ------------------------------------INSERCION EN LA ESTRUCTURA-----------------------------
claveInput.addEventListener("input", () => {
    if (claveInput.value !== "") {
        insertarClaveButton.disabled = false;
    } else {
        insertarClaveButton.disabled = true;
    }
});


// Agregamos el evento para insertar la clave manualmente
insertarClaveButton.addEventListener("click", () => {
    const clave = parseInt(claveInput.value);
    const longitudClaveIngresada = clave.toString();

    busquedas.estructura = estructura;

    if (longitudClaveIngresada.length == longitudClave) {
        if (estructura.clavesInsertadas < estructura.tamaño) {
            if (!isNaN(clave) && clave >= 0) {
                if (busquedas.validarRegistro(clave)) {
                    alert("La clave ya existe dentro de la estructura.");
                } else { // Crea un registro y lo inserta en la estructura
                    let registro = new Registro(clave);
                    estructura.insertarRegistro(registro);
                    // mostrarTabla();
                    mostrarTablaOrdenada();

                    claveInput.value = "";
                    claveInput.focus();

                    busquedaPanel.style.display = "block";
                    reiniciarEstructuraButton.disabled = false;
                    eliminarClaveButton.disabled = false;

                    localStorage.setItem('estructuraData', JSON.stringify(estructura));
                }
            } else {
                alert("Debe introducir una clave y que sea de valor positivo");
            }
        } else {
            alert("No se puede agregar la clave a la estructura.    La estructura está llena.");
        }
    } else {
        alert("La longitud de la clave no coincide con la longitud ingresada.");
    }

});
// ------------------------------------CIERRE INSERCION EN LA ESTRUCTURA---------------------------

// ------------------------------------------BUSCAR------------------------------------------------
buscarButton.addEventListener("click", () => {
    const claveBusqueda = parseInt(claveBusquedaInput.value);
    if (isNaN(claveBusqueda)) {
        alert("Ingrese una clave de búsqueda válida.");
        // resultado.textContent = "Por favor, ingrese una clave válida.";
        // resultado.style.display = "block";
        return;
    }
    busquedas.estructura = estructuraOrdenada;
    if (busquedaSecuencialRadio.checked) {
        const [posicion, iteraciones] = busquedas.busquedaSecuencial(claveBusqueda);
        mostrarResultado(posicion, iteraciones);
    } else if (busquedaBinariaRadio.checked) {
        const [posicion, iteraciones] = busquedas.busquedaBinaria(claveBusqueda);
        mostrarResultado(posicion, iteraciones);
    } else if (busquedaBloquesRadio.checked) {
        const [posicion, iteraciones] = blockSearchCSV(claveBusqueda);
        mostrarResultado(posicion, iteraciones);
    }
    claveBusquedaInput.focus();
});

// Función para búsqueda por bloques en el archivo CSV
function blockSearchCSV(clave) {
    let registrosOrdenados = estructuraOrdenada.registros;
    let iteraciones = 0;

    for (let i =( registrosOrdenados.length / tamañoBloque) - 1; i < registrosOrdenados.length; i += tamañoBloque) {

        iteraciones++;
        let aux = i;

        while (registrosOrdenados[i] === undefined) {
            i--;
        }

        if (clave === registrosOrdenados[i].getClave()) {
            return [i, iteraciones];
        } else if (clave < registrosOrdenados[i].getClave()) {
            for (let j = aux - tamañoBloque + 1; j < aux; j++) {
                if (registrosOrdenados[j] !== undefined) {
                    iteraciones++;
                    if (clave == registrosOrdenados[j].getClave()) {
                        return [j, iteraciones];
                    }
                }

            }
        }
        i = aux;
    }

    return [-1, iteraciones];
}

function mostrarResultado(posicion, iteraciones) {
    if (posicion !== -1) {
        alert("La clave se encontró en la posición " + (
            posicion + 1
        ) + " en " + iteraciones + " iteraciones.");
    } else {
        alert("La clave no se encontró en la estructura.");
    } resultado.style.display = "block";
}
// ---------------------------------------CIERRE BUSQUEDA-----------------------------------------

// -----------------------------------MOSTRAR TABLA-------------------------------------------------
function mostrarTablaOrdenada() {
    estructuraOrdenada = estructura;
    estructuraOrdenada.ordenarRegistros();
    let registrosOrdenados = estructuraOrdenada.getRegistros();
    tablaOrdenada.innerHTML = "<tr><th colspan='2'>Estructura de claves ordenadas</th></tr><tr><th>Índice</th><th>Clave</th></tr>";
    for (let i = 0; i < registrosOrdenados.length; i++) {
        if (registrosOrdenados[i] != undefined) {
            const row = document.createElement("tr");
            if (i % tamañoBloque == 0) {
                const rowBlock = document.createElement("tr");
                rowBlock.innerHTML = `<td colspan='2'>Bloque ${
                    (i / 10) + 1
                }</td>`;
                tablaOrdenada.appendChild(rowBlock);
            }
            row.innerHTML = `<td>${
                i + 1
            }</td><td>${
                registrosOrdenados[i].getClave()
            }</td>`;
            tablaOrdenada.appendChild(row);
        }

    }
    tablaOrdenada.style.display = "block";
}
// ----------------------------------CIERRE MOSTRAR TABLA-------------------------------------------

eliminarClaveButton.addEventListener("click", () => {
    if (estructura.clavesInsertadas == 0) {
        alert("No se puede eliminar la clave, la estructura está vacía.");
    } else {

        const claveEliminar = parseInt(claveInput.value);
        if (! busquedas.validarRegistro(claveEliminar)) {
            alert("No se encontró la clave dentro de la estructura.");
        } else {
            if (claveInput.value == "" || claveEliminar < 0) {
                alert("Ingrese una clave válida.");
            } else {
                claveInput.value = "";
                estructura.eliminarRegistro(claveEliminar);
                // mostrarTabla();
                mostrarTablaOrdenada();
                // estructura.showClaves();
                localStorage.setItem('estructuraData', JSON.stringify(estructura));
            }
        }

        claveInput.focus();

    }


});

reiniciarEstructuraButton.addEventListener("click", () => {
    reiniciarEstructura();
});

function reiniciarEstructura() {
    estructura = undefined;
    estructura = new Estructura();
    estructura.inicializarEstructura(0);
    // localStorage.setItem('estructuraData', JSON.stringify(estructura));
    localStorage.removeItem('estructuraData');
    tamañoEstructuraInput.disabled = false;
    tamañoEstructuraInput.value = "";
    crearEstructuraButton.disabled = true;
    reiniciarEstructuraButton.disabled = true;
    tamañoClaveInput.value = "";
    tamañoClaveInput.disabled = false;
    definirLongitudClaveButton.disabled = false;
    tamañoClavePanel.style.display = "none";
    tamañoEstructuraPanel.style.display = "none";
    llenarManualmentePanel.style.display = "none";
    tabla.style.display = "none";
    busquedaPanel.style.display = "none";
    tablaOrdenada.style.display = "none";
    resultado.style.display = "none";
    realizarBusquedaPanel.style.display = "none";
    eliminarClaveButton.disabled = true;
}
