import Busquedas from "./Busquedas.js";
import Estructura from "./Estructura.js";
import NodoListaEnlazada from "./NodoListaEnlazada.js";
import Registro from "./Registro.js";
import FuncionHash from "./FuncionHash.js";
import SolucionColisiones from "./SolucionColisiones.js";
import {ValidarEstructura, CargarEstructuraGuardada} from './CargarEstructura.js';

const cargarEstructuraPanel = document.getElementById("cargarEstructuraPanel");
const cargarEstructuraButton = document.getElementById("cargarEstructuraButton");
const noCargarEstructuraButton = document.getElementById("noCargarEstructuraButton");

const solucionColisionPanel = document.getElementById("solucionColisionPanel");
const solucionLinealRadio = document.getElementById("solucionLineal");
const solucionCuadraticaRadio = document.getElementById("solucionCuadratica");
const solucionDobleHashRadio = document.getElementById("solucionDobleHash");

const seleccionarRangoPanel = document.getElementById("seleccionarRangoPanel");
const tamañoClavePanel = document.getElementById("tamañoClavePanel");
const definirLongitudClaveButton = document.getElementById("definirLongitudClave");
const tamañoClaveInput = document.getElementById("tamañoClave");

const eliminarClaveButton = document.getElementById("eliminarClave");
// --------------------------------
const rangoComboBox = document.getElementById("rango");
const elegirRangoButton = document.getElementById("elegirRango");
const reiniciarButton = document.getElementById("reiniciar");
const funcionHashPanel = document.getElementById("funcionHashPanel");
const hashModuloRadio = document.getElementById("hashModulo");
const hashCuadradoRadio = document.getElementById("hashCuadrado");
const hashTruncamientoRadio = document.getElementById("hashTruncamiento");
const hashPlegamientoRadio = document.getElementById("hashPlegamiento");
const insercionClavesPanel = document.getElementById("insercionClavesPanel");
const claveInput = document.getElementById("claveInsertar");
const insertarClaveButton = document.getElementById("insertarClave");
const tabla = document.getElementById("tabla");
const colisiones = document.getElementById("colisiones");
const busquedaPanel = document.getElementById("busquedaPanel");
const claveBusquedaInput = document.getElementById("claveBusqueda");
const buscarButton = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

let funcionHash = "";
let solucionColision = "";

let colisionesArray = new Array(0);

let longitudClave = 0;
let rango = 0; // o tamaño de la estructura

let estructura = new Estructura();
let busquedas = new Busquedas();

let funcionHashMetodo = new FuncionHash();

// --------------------------------------Estructura encontrada--------------------------
let estructuraEncontrada = ValidarEstructura();
let estructuraCargada = false;
if (estructuraEncontrada != null) {

    if (estructuraEncontrada.clavesInsertadas > 0) {
        cargarEstructuraPanel.style.display = "block";

    } else {
        cargarEstructuraPanel.style.display = "none";
        seleccionarRangoPanel.style.display = "block";
    }
} else {
    seleccionarRangoPanel.style.display = "block";
} cargarEstructuraButton.addEventListener("click", () => {

    estructuraCargada = true;
    estructura = CargarEstructuraGuardada();

    rango = estructura.tamaño;
    longitudClave = estructura.longitudClave;

    funcionHashPanel.style.display = "block";
    seleccionarRangoPanel.style.display = "block";
    rangoComboBox.value = rango;
    rangoComboBox.disabled = true;
    elegirRangoButton.disabled = true;

    tamañoClavePanel.style.display = "block";
    tamañoClaveInput.value = longitudClave;
    tamañoClaveInput.disabled = true;

    cargarEstructuraPanel.style.display = "none";
    definirLongitudClaveButton.disabled = true;
    reiniciarButton.disabled = false;

    // alert("Se ha cargado la estructura correctamente.");

});

noCargarEstructuraButton.addEventListener("click", () => {

    cargarEstructuraPanel.style.display = "none";
    seleccionarRangoPanel.style.display = "block";
    // tamañoEstructuraPanel.style.display = "block";

});

// ---------------------------------CIERRE CARGAR ESTRUCTURA--------------------------------------

function insertarEnListaEnlazada(posicion, clave) {
    if (colisionesArray[posicion] === undefined) {
        colisionesArray[posicion] = new NodoListaEnlazada(clave);
    } else {
        let actual = colisionesArray[posicion];
        while (actual.siguiente !== null) {
            actual = actual.siguiente;
        }
        actual.siguiente = new NodoListaEnlazada(clave);
    }
}

// ----------------------------------CREACIÓN ESTRUCTURA---------------------------------------

elegirRangoButton.addEventListener("click", () => {
    rango = parseInt(rangoComboBox.value);
    estructura.tamaño = rango;
    estructura.inicializarEstructura(rango);
    tamañoClavePanel.style.display = "block";
    tamañoClaveInput.disabled = false;
    definirLongitudClaveButton.disabled = false;

    elegirRangoButton.disabled = true;
    rangoComboBox.disabled = true;
    reiniciarButton.disabled = false;
});

definirLongitudClaveButton.addEventListener("click", () => {
    longitudClave = parseInt(tamañoClaveInput.value);
    if (tamañoClaveInput.value == "" || longitudClave < 1 || longitudClave > 10) {
        alert("Ingrese una longitud de clave entre 1 y 10");
    } else { // Si es una longitud válida me muestra el panel para seleccionar la función hash a utilizar

        definirLongitudClaveButton.disabled = true;
        tamañoClaveInput.disabled = true;

        funcionHashPanel.style.display = "block";
        busquedaPanel.style.display = "block";

        estructura.longitudClave = longitudClave;
    }
});

// ----------------------------------CIERRE CREACIÓN ESTRUCTURA---------------------------------------

// ----------------------SELECCIÓN DE FUNCIÓN HASH Y SOLUCIÓN DE COLISIONES----------------------------
// Funciónes hash
hashModuloRadio.addEventListener("change", () => {
    funcionHash = "modulo";
    mostrarSolucionHashPanel();

});

hashCuadradoRadio.addEventListener("change", () => {
    funcionHash = "cuadrado";
    mostrarSolucionHashPanel();
});

hashTruncamientoRadio.addEventListener("change", () => {
    funcionHash = "truncamiento";
    mostrarSolucionHashPanel();
});

hashPlegamientoRadio.addEventListener("change", () => {
    funcionHash = "plegamiento";
    mostrarSolucionHashPanel();
});

function mostrarSolucionHashPanel() {
    funcionHashPanel.style.display = "none";
    solucionColisionPanel.style.display = "block";
}

// Solución de colisiones
solucionLinealRadio.addEventListener("change", () => {
    solucionColision = "lineal";
    mostrarInsercionClavesPanel();
});

solucionCuadraticaRadio.addEventListener("change", () => {
    solucionColision = "cuadratica";
    mostrarInsercionClavesPanel();
});

solucionDobleHashRadio.addEventListener("change", () => {
    solucionColision = "dobleHash";
    mostrarInsercionClavesPanel();
});

function mostrarInsercionClavesPanel() {
    if (estructuraCargada) {
        estructura.registros = ReinsertarRegistros();
    }
    busquedas.setEstructura(estructura);


    solucionColisionPanel.style.display = "none";
    funcionHashPanel.style.display = "none";
    busquedaPanel.style.display = "block";
    insercionClavesPanel.style.display = "block";
    eliminarClaveButton.disabled = true;
    reiniciarButton.disabled = false;

    mostrarTabla();
}

// ---------------------CIERRE SELECCIÓN FUNCIÓN Y SOLUCIÓN------------------------------

// --------------------------------INSERCIÖN CLAVES----------------------------------------
insertarClaveButton.addEventListener("click", () => {
    busquedas.setEstructura(estructura);
    const clave = parseInt(claveInput.value);

    if (!isNaN(clave) && clave >= 1) {
        if (claveInput.value.length != longitudClave) {
            alert("La longitud de la clave no coincide con la longitud ingresada.");
        } else {

            if (estructura.clavesInsertadas < estructura.tamaño) {
                if (! busquedas.validarRegistro(clave)) {
                    const posicion = funcionHashMetodo.calcularPosicion(funcionHash, clave, rango);
                    if (posicion !== -1) { // Valida que la posicion de la estructura este desocupada
                        let registro = new Registro(clave);

                        if (estructura.registros[posicion] === undefined) { // Inserta según la función hash
                            estructura.insertarRegistroEnPosicion(registro, posicion);
                            // Se ha producido una colision
                        } else {
                            alert("Se ha presentado una colisión en la posición: " + posicion + " con la clave: " + estructura.registros[posicion].getClave());
                            let solucionColisiones = new SolucionColisiones(estructura.registros);
                            let nuevaPosicion = solucionColisiones.solucionarColisionInsercion(solucionColision, posicion, funcionHash);
                            estructura.insertarRegistroEnPosicion(registro, nuevaPosicion);

                        } claveInput.value = "";
                        claveInput.focus();
                        eliminarClaveButton.disabled = false;

                        mostrarTabla();
                        // mostrarBusquedaPanel();

                        // Guarda la estructura no sé en dónde XD
                        localStorage.setItem('estructuraData', JSON.stringify(estructura));
                    } else {
                        alert("La clave no es válida para esta función.");
                    }
                } else {
                    alert("La clave ya existe en la estructura.");
                }
            } else {
                alert("Ya ha ingresado todas las claves.");
                // mostrarBusquedaPanel();
            }
        }
    } else {
        alert("Por favor, ingrese un valor positivo válido.");
    }

});

// -------------------------------------CIERRE INSERCION-----------------------------------------------

buscarButton.addEventListener("click", () => {
    if ((claveBusquedaInput.value !== "") && claveBusquedaInput.value >= 0) {
        const claveBusqueda = parseInt(claveBusquedaInput.value);
        const posicion = funcionHashMetodo.calcularPosicion(funcionHash, claveBusqueda, rango);
        if (estructura.registros[posicion] !== undefined && estructura.registros[posicion].getClave() === claveBusqueda) {
            mostrarResultado(claveBusqueda, posicion, 1);
            // Tal vez haya colision
        } else if (estructura.registros[posicion] !== undefined) {
            let solucionColisiones = new SolucionColisiones(estructura.registros);
            const [nuevaPosicion, iteraciones] = solucionColisiones.solucionarColisionBusqueda(solucionColision, posicion, funcionHash, claveBusqueda);
            if (nuevaPosicion != -1) { // Se encontró una clave
                mostrarResultado(claveBusqueda, nuevaPosicion, iteraciones);
            }
            // mostrarResultadoConColisiones(posicion, claveBusqueda);
        } else {
            alert("La clave no se encontró en la estructura.");
            // resultado.textContent = "La clave no se encuentra en la estructura.";
            resultado.style.display = "block";
        }

    } else {
        alert("Por favor, ingrese una clave de búsqueda válida.");
    }
});

eliminarClaveButton.addEventListener("click", () => {
    eliminarClave();

});

function eliminarClave() {

    const claveEliminar = parseInt(claveInput.value);
    const posicion = funcionHashMetodo.calcularPosicion(funcionHash, claveEliminar, rango);
    console.log("posicion a eliminar: " + posicion);
    if (claveInput.value == "" || claveEliminar < 0) {
        alert("Ingrese una clave válida.");
    } else {
        if (! busquedas.validarRegistro(claveEliminar)) {
            alert("La clave no se encontró en la estructura.");
        } else {
            if (estructura.registros[posicion] !== undefined && estructura.registros[posicion].getClave() === claveEliminar) {
                estructura.eliminarRegistro(claveEliminar);
                // Tal vez haya colision
            } else if (estructura.registros[posicion] !== undefined) {
                let solucionColisiones = new SolucionColisiones(estructura.registros);
                const [nuevaPosicion, iteraciones] = solucionColisiones.solucionarColisionBusqueda(solucionColision, posicion, funcionHash, claveEliminar);
                if (nuevaPosicion != -1) { // Se encontró una clave
                    console.log(nuevaPosicion + " - " + iteraciones);
                    estructura.eliminarRegistro(claveEliminar);
                }
                // mostrarResultadoConColisiones(posicion, claveBusqueda);
            } else {
                alert("La clave no se encontró en la estructura.");
                // resultado.textContent = "La clave no se encuentra en la estructura.";
                resultado.style.display = "block";
            } claveInput.value = "";
            claveInput.focus();
            mostrarTabla();
            // estructura.showClaves();
            localStorage.setItem('estructuraData', JSON.stringify(estructura));
        }

    }

}


function mostrarTabla() {
    tabla.innerHTML = "<tr><th colspan='2'>Estructura de claves Hasheadas</th></tr><tr><th>Índice</th><th>Clave</th></tr>";

    // tabla.innerHTML = "<tr><th>Índice</th><th>Clave</th></tr>";
    for (let i = 0; i < estructura.tamaño; i++) {
        const row = document.createElement("tr");
        if (estructura.registros[i] != undefined) {
            row.innerHTML = `<td>${
                i + 1
            }</td><td>${
                estructura.registros[i].getClave()
            }</td>`;
        } else { // row.innerHTML = `<td>${i + 1}</td><td>---</td>`;
        } tabla.appendChild(row);
    }
    tabla.style.display = "block";
}

function mostrarResultado(clave, posicion, iteraciones) {
    alert("La clave " + clave + " se encontró en la posición " + (
        posicion + 1
    ) + " con " + iteraciones + " iteracion(es).");
}

function reiniciarEstructura() { // rango = parseInt(rangoComboBox.value);
    funcionHash = "";
    solucionColision = "";
    // clavesIngresadas = 0;
    // colisionesArray = [];
    claveInput.value = "";
    claveBusquedaInput.value = "";
    tabla.style.display = "none";
    funcionHashPanel.style.display = "none";
    insercionClavesPanel.style.display = "none";
    busquedaPanel.style.display = "none";
    resultado.style.display = "none";
    colisiones.innerHTML = "";

    rangoComboBox.disabled = false;
    elegirRangoButton.disabled = false;
    reiniciarButton.disabled = true;
    solucionLinealRadio.checked = false;
    solucionCuadraticaRadio.checked = false;
    solucionDobleHashRadio.checked = false;
    hashModuloRadio.checked = false;
    hashCuadradoRadio.checked = false;
    hashTruncamientoRadio.checked = false;
    hashPlegamientoRadio.checked = false;
    eliminarClaveButton.disabled = true;
    localStorage.removeItem('estructuraData');

}

reiniciarButton.addEventListener("click", () => {
    reiniciarEstructura();
});

function ReinsertarRegistros() {
    // Si se obtiene una estructura cargada, se reinsertan los registros según la función hash seleccionada
    // Y Según el método de solución de colisiones

    let registrosAux = estructura.registros;
    let registrosReinsertados = Array.from({
        length: rango
    }, () => undefined);

    for (let i = 0; i < registrosAux.length; i++) {

        if (registrosAux[i] != undefined) {
            let claveRegistro = new Registro(registrosAux[i].getClave());
            let posicion = funcionHashMetodo.calcularPosicion(funcionHash, registrosAux[i].getClave(), rango);
            if (registrosReinsertados[posicion] === undefined) {
                registrosReinsertados[posicion] = claveRegistro;
            } else {
                let solucionColisiones = new SolucionColisiones(registrosReinsertados);
                let nuevaPosicion = solucionColisiones.solucionarColisionInsercion(solucionColision, posicion, funcionHash);
                registrosReinsertados[nuevaPosicion] = claveRegistro;
            }
        }
    }

    return registrosReinsertados;
}
