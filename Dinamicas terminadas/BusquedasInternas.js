import Busquedas from './Busquedas.js';
import Estructura from './Estructura.js';
import Registro from './Registro.js';
import {ValidarEstructura, CargarEstructuraGuardada} from './CargarEstructura.js';

//
const cargarEstructuraPanel = document.getElementById("cargarEstructuraPanel");
const cargarEstructuraButton = document.getElementById("cargarEstructuraButton");
const noCargarEstructuraButton = document.getElementById("noCargarEstructuraButton");

const tamañoEstructuraPanel = document.getElementById("tamanoEstructuraPanel");
const tamañoClavePanel = document.getElementById("tamañoClavePanel");
const definirLongitudClaveButton = document.getElementById("definirLongitudClave");
const tamañoClaveInput = document.getElementById("tamañoClave");

const realizarBusquedaPanel = document.getElementById("realizarBusquedaPanel");
const eliminarClaveButton = document.getElementById("eliminarClave");
// ------------------------------------------------------------------
const tamañoEstructuraInput = document.getElementById("tamaño");
const crearEstructuraButton = document.getElementById("crearEstructura");
const reiniciarButton = document.getElementById("reiniciar");
const crearEstructuraPanel = document.getElementById("crearEstructuraPanel");
const llenarAleatoriamenteButton = document.getElementById("llenarAleatoriamente");
const llenarManualmenteButton = document.getElementById("llenarManualmente");
const llenarManualmentePanel = document.getElementById("llenarManualmentePanel");
const claveInput = document.getElementById("clave");
// const tabla = document.getElementById("tabla");
const busquedaPanel = document.getElementById("busquedaPanel");
const busquedaSecuencialRadio = document.getElementById("busquedaSecuencial");
const busquedaBinariaRadio = document.getElementById("busquedaBinaria");
const claveBusquedaInput = document.getElementById("claveBusqueda");
const buscarButton = document.getElementById("buscar");
const resultado = document.getElementById("resultado");
const insertarClaveButton = document.getElementById("insertarClave");
// Agregamos el botón de inserción de clave

//

let registros = [];
let registrosOrdenados = [];
let longitudClave = 0;
let tamañoEstructura = 0;

let busquedas = new Busquedas();
let estructura = new Estructura();
let estructuraOrdenada = new Estructura();

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
    reiniciarButton.disabled = false;
    llenarManualmentePanel.style.display = "block";
    eliminarClaveButton.disabled = false;
    realizarBusquedaPanel.style.display = "block";

    mostrarTablaOrdenada();


});

noCargarEstructuraButton.addEventListener("click", () => {

    cargarEstructuraPanel.style.display = "none";
    tamañoEstructuraPanel.style.display = "block";
});
// ---------------------------------CIERRE CARGAR ESTRUCTURA--------------------------------------


// ----------------------------------------------------------------
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
    } else { // Inicializa la estructura
        estructura.tamaño = tamañoEstructura;
        estructura.inicializarEstructura(tamañoEstructura);

        tamañoClavePanel.style.display = "block";
        crearEstructuraButton.disabled = true;
        tamañoEstructuraInput.disabled = true;
        reiniciarButton.disabled = false;
    }

});

// Después de ingresar la longitud de las claves
definirLongitudClaveButton.addEventListener("click", () => {
    longitudClave = parseInt(tamañoClaveInput.value);

    if (tamañoClaveInput.value == "" || longitudClave < 1 || longitudClave > 10) {
        alert("Ingrese una longitud de clave entre 1 y 10");
    } else { // crearEstructuraPanel.style.display = "block";
        definirLongitudClaveButton.disabled = true;
        tamañoClaveInput.disabled = true;
        // Setea la longitud
        estructura.longitudClave = longitudClave;
        crearEstructuraManualmente();
    }
});

llenarAleatoriamenteButton.addEventListener("click", () => {
    crearEstructuraAleatoriamente();
    realizarBusquedaPanel.style.display = "block";
});

llenarManualmenteButton.addEventListener("click", () => {
    crearEstructuraManualmente();
});

eliminarClaveButton.addEventListener("click", () => {
    busquedas.estructura = estructura;

    const claveEliminar = parseInt(claveInput.value);
    if (! claveInput.value == "" || claveEliminar > 0) {
        if (busquedas.validarRegistro(claveEliminar)) {
            claveInput.value = "";
            claveInput.focus();
            estructura.eliminarRegistro(claveEliminar);
            mostrarTablaOrdenada();
            estructura.showClaves();
            localStorage.setItem('estructuraData', JSON.stringify(estructura));
        } else {
            alert("La clave no existe en la estructura.");
        }

    } else {


        alert("Ingrese una clave válida.");

    }


});


// --------------------------------Crear estructura manual o aleatoriamente-------------------
function crearEstructuraAleatoriamente() { // Llena la estructura con claves que tengan longitud igual a la que se ingresó

    busquedas.estructura = estructura;
    for (let i = 0; i < tamañoEstructura; i++) {
        let clave = 0;
        do {
            clave = generarClaveAleatoria(longitudClave);
        } while (busquedas.validarRegistro(clave)); // Verificar si la clave ya existe
        let registro = new Registro(clave);
        estructura.insertarRegistro(registro);
    }

    mostrarTablaOrdenada();
    crearEstructuraPanel.style.display = "none";
    llenarManualmentePanel.style.display = "none";
    eliminarClavePanel.style.display = "block";
    busquedaPanel.style.display = "block";
    reiniciarButton.disabled = false;
    localStorage.setItem('estructuraData', JSON.stringify(estructura));

}

// Genera claves aleatorias usando números con cifras según la longitud de la clave
// ej: longitud = 2 -> claves desde (10 - 99)
// ej: longitud = 3 -> claves desde (100 - 999)
// etc.
function generarClaveAleatoria(longitudClave) {
    const pow = Math.pow(10, longitudClave);
    const powMinus = (Math.pow(10, longitudClave - 1));
    const min = pow - (9 * powMinus);
    const max = pow - 1;
    return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
}

function crearEstructuraManualmente() { // Inicializar la estructura

    busquedas.estructura = estructura;

    mostrarTablaOrdenada();

    crearEstructuraPanel.style.display = "none";
    llenarManualmentePanel.style.display = "block";
    tamañoEstructuraInput.disabled = true;
    crearEstructuraButton.disabled = true;
    reiniciarButton.disabled = false;
}

// ---------------------------------------------------------------------------------
// --------------------------------------CIERRRE CREACIÓN----------------------------

reiniciarButton.addEventListener("click", () => {
    reiniciarEstructura();
});

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
    const longitudIngresada = clave.toString();
    busquedas.estructura = estructura;
    if (longitudIngresada.length == longitudClave) {
        if (estructura.clavesInsertadas < estructura.tamaño) {
            if (!isNaN(clave) && clave >= 0) {
                if (busquedas.validarRegistro(clave)) {
                    alert("La clave ya existe dentro de la estructura.");
                } else { // Crea un registro y lo inserta en la estructura
                    let registro = new Registro(clave);
                    estructura.insertarRegistro(registro);
                    mostrarTablaOrdenada();

                    claveInput.value = "";
                    claveInput.focus();

                    busquedaPanel.style.display = "block";
                    reiniciarButton.disabled = false;
                    eliminarClaveButton.disabled = false;
                    realizarBusquedaPanel.style.display = "block";

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

buscarButton.addEventListener("click", () => {
    const claveBusqueda = parseInt(claveBusquedaInput.value);
    // Cada vez que se desea buscar se setea la estructura para realizar la busqueda
    // busquedas.setEstructura(estructura);
    if (isNaN(claveBusqueda)) {
        alert("Ingrese un valor o clave válidos.");
        return;
    }

    if (busquedaSecuencialRadio.checked) {
        busquedas.setEstructura(estructura);
        const [posicion, iteraciones] = busquedas.busquedaSecuencial(claveBusqueda);
        mostrarResultado(posicion, iteraciones);
    } else if (busquedaBinariaRadio.checked) {
        busquedas.setEstructura(estructuraOrdenada);
        const [posicion, iteraciones] = busquedas.busquedaBinaria(claveBusqueda);
        mostrarResultado(posicion, iteraciones);
    }
});

function reiniciarEstructura() {
    estructura = undefined;
    estructura = new Estructura();
    estructura.inicializarEstructura(0);
    localStorage.removeItem('estructuraData');
    tamañoEstructuraInput.disabled = false;
    tamañoEstructuraInput.value = "";
    crearEstructuraButton.disabled = true;
    reiniciarButton.disabled = true;
    tamañoClaveInput.value = "";
    tamañoClaveInput.disabled = false;
    definirLongitudClaveButton.disabled = false;
    tamañoClavePanel.style.display = "none";
    crearEstructuraPanel.style.display = "none";
    llenarManualmentePanel.style.display = "none";
    busquedaPanel.style.display = "none";
    tablaOrdenada.style.display = "none";
    resultado.style.display = "none";
    realizarBusquedaPanel.style.display = "none";
    eliminarClavePanel.disabled = true;
}

function mostrarTablaOrdenada() {
    estructuraOrdenada = estructura;
    estructuraOrdenada.ordenarRegistros();
    registrosOrdenados = estructuraOrdenada.getRegistros();

    tablaOrdenada.innerHTML = "<tr><th colspan='2'>Estructura de claves ordenadas</th></tr><tr><th>Índice</th><th>Clave</th></tr>";
    for (let i = 0; i < registrosOrdenados.length; i++) {
        if (registrosOrdenados[i] != undefined) {
            const row = document.createElement("tr");
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

function mostrarResultado(posicion, iteraciones) {
    if (posicion !== -1) {
        resultado.textContent = `La clave se encuentra en la posición ${
            posicion + 1
        }. Iteraciones realizadas: ${iteraciones}.`;
    } else {
        resultado.textContent = `La clave no se encuentra en la estructura. Iteraciones realizadas: ${iteraciones}.`;
    } resultado.style.display = "block";
}
