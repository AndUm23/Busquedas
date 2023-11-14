import Estructura from "./Estructura.js";
import Busquedas from "./Busquedas.js";
import FuncionHash from "./FuncionHash.js";
import Registro from "./Registro.js";
import { expansionTotal, reduccionTotal, reinsertarRegistros } from "./EstructuraDinamica.js";
import { ValidarEstructura, CargarEstructuraGuardada } from './CargarEstructura.js';

const cargarEstructuraPanel = document.getElementById("cargarEstructuraPanel");
const cargarEstructuraButton = document.getElementById("cargarEstructuraButton");
const noCargarEstructuraButton = document.getElementById("noCargarEstructuraButton");

const tipoExpansionDinamicaPanel = document.getElementById("tipoExpansionDinamicaPanel");
const expansionTotalRadio = document.getElementById("expansionTotalRadio");
const expansionParcialRadio = document.getElementById("expansionParcialRadio");

const tamañoCubetaPanel = document.getElementById("tamañoCubetaPanel");
const cantidadCubetasInput = document.getElementById("cantidadCubetasInput");
const cantidadRegistrosInput = document.getElementById("tamañoCubetaInput");
const definirTamañoEstructuraButton = document.getElementById("definirTamañoEstructuraButton");

const densidadesDeOcupacionPanel = document.getElementById("densidadesDeOcupacionPanel");
const definirDensidadesButton = document.getElementById("definirDensidadesButton");
const densidadDeOcupacionExpansionInput = document.getElementById("densidadDeOcupacionExpansionInput");
const densidadDeOcupacionReduccionInput = document.getElementById("densidadDeOcupacionReduccionInput");

const tamañoClavePanel = document.getElementById("tamañoClavePanel");
const definirLongitudClaveButton = document.getElementById("definirLongitudClaveButton");
const tamañoClaveInput = document.getElementById("tamañoClaveInput");

const funcionHashPanel = document.getElementById("funcionHashPanel");

const hashModuloRadio = document.getElementById("hashModulo");
const hashCuadradoRadio = document.getElementById("hashCuadrado");
const hashTruncamientoRadio = document.getElementById("hashTruncamiento");
const hashPlegamientoRadio = document.getElementById("hashPlegamiento");

const crearEstructuraPanel = document.getElementById("crearEstructuraPanel");
const crearEstructuraButton = document.getElementById("crearEstructuraButton");
const reiniciarEstructuraButton = document.getElementById("reiniciarEstructuraButton");

const insertarClavePanel = document.getElementById("insertarClavePanel");
const insertarClaveButton = document.getElementById("insertarClaveButton");
const claveInput = document.getElementById("insertarClaveInput");

const eliminarClavePanel = document.getElementById("eliminarClavePanel");
const eliminarClaveButton = document.getElementById("eliminarClaveButton");

const tabla = document.getElementById("tablaOrdenada");

const buscarClavePanel = document.getElementById("busquedaPanel");
const buscarClaveInput = document.getElementById("busquedaClaveInput");
const buscarClaveButton = document.getElementById("buscar");
let tipoExpansion = "";

let cantidadCubetas = 0;
let cantidadCubetasIniciales = 2;
let cantidadRegistros = 0;
let registrosInsertados = 0;

let factorExpansionReduccion = 0;

let densidadOcupacionExpansion = 0;
let densidadOcupacionReduccion = 0;
let densidadOcupacion = 0;

let tamañoClave = 0;

let funcionHash = "";

let estructura = [];

let estructuraGuardada = new Estructura();

let busquedas = new Busquedas();

let funcionHashMetodo = new FuncionHash();

let cargarEstructura = false;

//-------------------------------Estructura encontrada--------------------------
const estructuraEncontrada = ValidarEstructura();
if (estructuraEncontrada != null) {
    if (estructuraEncontrada.clavesInsertadas > 0) {
        cargarEstructuraPanel.style.display = "block";

    }
} else {
    cargarEstructuraPanel.style.display = "none";
    tipoExpansionDinamicaPanel.style.display = "block";

}
estructuraGuardada.inicializarEstructura(100);

cargarEstructuraButton.addEventListener("click", () => {
    estructuraGuardada = CargarEstructuraGuardada();

    console.log(estructuraGuardada);
    tipoExpansionDinamicaPanel.style.display = "block";
    cargarEstructuraPanel.style.display = "none";
    cargarEstructura = true;
});

noCargarEstructuraButton.addEventListener("click", () => {
    tipoExpansionDinamicaPanel.style.display = "block";
    cargarEstructuraPanel.style.display = "none";
});

expansionTotalRadio.addEventListener("change", () => {
    tipoExpansion = "expansionTotal";
    factorExpansionReduccion = 2;
    definirEstructura();
});

expansionParcialRadio.addEventListener("change", () => {
    tipoExpansion = "expansionParcial";
    factorExpansionReduccion = 1.5;
    definirEstructura();
});


function definirEstructura() {
    tamañoCubetaPanel.style.display = "block";
    console.log("a");
    if (cargarEstructura) {
        cantidadCubetasInput.disabled = true;
        alert("El número de cubetas se calculará según la cantidad de registros");
    }
}

definirTamañoEstructuraButton.addEventListener("click", () => {
    cantidadCubetas = parseInt(cantidadCubetasInput.value);
    //cantidadCubetasIniciales = cantidadCubetas;
    cantidadRegistros = parseInt(cantidadRegistrosInput.value);
    if (!cargarEstructura) {
        if (cantidadCubetasInput.value == "" || cantidadCubetas < 0) {
            alert("Ingrese una cantidad de cubetas válida.");
            return;
        }
    }
    else {
        cantidadCubetas = 2;
        console.log("CC(" + estructuraGuardada.clavesInsertadas + ") <= (div): " + Math.ceil(estructuraGuardada.clavesInsertadas / cantidadRegistros));
        while (cantidadCubetas <= Math.floor(estructuraGuardada.clavesInsertadas / cantidadRegistros) + 1) {
            cantidadCubetas = Math.floor(cantidadCubetas * factorExpansionReduccion);
        }
        //cantidadCubetasIniciales = cantidadCubetas;
        cantidadCubetasInput.value = cantidadCubetas;

    }
    if (cantidadRegistrosInput.value == "" || cantidadRegistros < 2) {
        alert("Ingrese una cantidad de registros válida (Mayor a 2).");
        return;
    }



    //sigue el curso mostrando el panel para digitar las densidades de ocupacion
    cantidadCubetasInput.disabled = true;
    cantidadRegistrosInput.disabled = true;
    definirTamañoEstructuraButton.disabled = true;
    densidadesDeOcupacionPanel.style.display = "block";

});

definirDensidadesButton.addEventListener("click", () => {
    densidadOcupacionExpansion = parseInt(densidadDeOcupacionExpansionInput.value);
    densidadOcupacionReduccion = parseInt(densidadDeOcupacionReduccionInput.value);
    if (densidadDeOcupacionExpansionInput.value == "" || densidadOcupacionExpansion < 0) {
        alert("Ingrese una densidad de ocupación para expansión válida.");
    } else if (densidadDeOcupacionReduccionInput.value == "" || densidadOcupacionReduccion < 0 || densidadOcupacionReduccion > cantidadRegistros * 100) {
        alert("Ingrese una cantidad de ocupación para reducción válida (mayor a 0 y menor a " + cantidadRegistros * 100 + "%).");
    } else {
        //sigue el curso mostrando el panel para digitar la longitud de la clave

        densidadDeOcupacionExpansionInput.disabled = true;
        densidadDeOcupacionReduccionInput.disabled = true;
        definirDensidadesButton.disabled = true;
        if (cargarEstructura) {
            tamañoClaveInput.disabled = true;
            tamañoClaveInput.value = estructuraEncontrada.longitudClave;
            tamañoClave = estructuraEncontrada.longitudClave;
            definirLongitudClaveButton.disabled = true;
        }
        tamañoClavePanel.style.display = "block";
        funcionHashPanel.style.display = "block";

    }
});

definirLongitudClaveButton.addEventListener("click", () => {

    tamañoClave = parseInt(tamañoClaveInput.value);

    if (tamañoClaveInput.value == "" || tamañoClave < 0) {
        alert("Ingrese una longitud de clave válida.");
    } else {
        //sigue el curso mostrando el panel para ingresar la función hash a utilizar
        tamañoClaveInput.disabled = true;
        definirLongitudClaveButton.disabled = true;
        funcionHashPanel.style.display = "block";
        estructuraGuardada.longitudClave = tamañoClave;
    }


});

hashModuloRadio.addEventListener("change", () => {
    funcionHash = "modulo";
    crearEstructuraPanel.style.display = "block";
});

hashCuadradoRadio.addEventListener("change", () => {
    funcionHash = "cuadrado";
    crearEstructuraPanel.style.display = "block";
});

hashTruncamientoRadio.addEventListener("change", () => {
    funcionHash = "truncamiento";
    crearEstructuraPanel.style.display = "block";
});

hashPlegamientoRadio.addEventListener("change", () => {
    funcionHash = "plegamiento";
    crearEstructuraPanel.style.display = "block";
});

crearEstructuraButton.addEventListener("click", () => {

    crearEstructuraButton.disabled = true;
    insertarClavePanel.style.display = "block";
    crearEstructura();
});

reiniciarEstructuraButton.addEventListener("click", () => {

    tipoExpansion = "";

    cantidadCubetas = 0;
    cantidadCubetasIniciales = 2;
    cantidadRegistros = 0;
    registrosInsertados = 0;

    densidadOcupacionExpansion = 0;
    densidadOcupacionReduccion = 0;
    densidadOcupacion = 0;

    tamañoClave = 0;

    funcionHash = "";

    estructura = [];
    cargarEstructura = false;

    //cargarEstructuraPanel.style.display = "block";
    expansionTotalRadio.checked = false;
    expansionParcialRadio.checked = false;

    tamañoCubetaPanel.style.display = "none";
    cantidadCubetasInput.disabled = false;
    cantidadCubetasInput.value = "";
    cantidadRegistrosInput.disabled = false;
    cantidadRegistrosInput.value = "";
    definirTamañoEstructuraButton.disabled = false;

    densidadesDeOcupacionPanel.style.display = "none";
    densidadDeOcupacionExpansionInput.disabled = false;
    densidadDeOcupacionExpansionInput.value = "";
    densidadDeOcupacionReduccionInput.disabled = false;
    densidadDeOcupacionReduccionInput.value = "";
    definirDensidadesButton.disabled = false;

    tamañoClavePanel.style.display = "none";
    tamañoClaveInput.disabled = false;
    tamañoClaveInput.value = "";
    definirLongitudClaveButton.disabled = false;
    funcionHashPanel.style.display = "none";
    hashModuloRadio.checked = false;
    hashCuadradoRadio.checked = false;
    hashPlegamientoRadio.checked = false;
    hashTruncamientoRadio.checked = false;
    crearEstructuraPanel.style.display = "none";
    crearEstructuraButton.disabled = false;

    insertarClavePanel.style.display = "none";
    eliminarClaveButton.disabled = true;
    buscarClavePanel.style.display = "none";
    tabla.innerHTML = "";
    localStorage.removeItem('estructuraData');


});

function crearEstructura() {
    funcionHashPanel.style.display = "none";

    for (let i = 0; i < cantidadRegistros * 2; i++) {
        estructura[i] = new Estructura();
        estructura[i].inicializarEstructura(cantidadCubetas);
    }

    if (cargarEstructura) {
        eliminarClaveButton.disabled = false;
        reinsertarRegistrosCargados();

    }
    buscarClavePanel.style.display = "block";
    mostrarTabla();
}

function reinsertarRegistrosCargados() {
    let funcionHashMetodo = new FuncionHash();
    let insertoEstructura = false;
    //Si se obtiene una estructura cargada, se reinsertan los registros según la función hash seleccionada
    //Y Según el método de solución de colisiones
    console.log("RRCE: ");
    console.log(estructuraGuardada);
    for (let i = 0; i < estructuraGuardada.clavesInsertadas; i++) {
        const posicion = funcionHashMetodo.calcularPosicion(funcionHash, estructuraGuardada.registros[i].getClave(), cantidadCubetas);
        let registro = new Registro(estructuraGuardada.registros[i].getClave());
        if (estructura[0].registros[posicion] === undefined) {
            estructura[0].insertarRegistroEnPosicion(registro, posicion);
            registrosInsertados++;
        } else {
            //llena todas las posiciones hasta que no quede más cantidad de registros
            for (let j = 1; j < cantidadRegistros * 2; j++) {
                if (estructura[j].registros[posicion] === undefined) {
                    estructura[j].insertarRegistroEnPosicion(registro, posicion);
                    insertoEstructura = true;
                    registrosInsertados++;
                    break;
                }
            }
        }
        calcularDensidadDeOcupacionExpansion();

    }
}

insertarClaveButton.addEventListener("click", () => {
    const clave = parseInt(claveInput.value);

    const posicion = funcionHashMetodo.calcularPosicion(funcionHash, clave, cantidadCubetas);

    let existe = false;
    let insertoEstructura = false;
    if (claveInput.value != "" || clave > 0) {
        if (claveInput.value.length === tamañoClave) {
            //validar la clave en la estructura
            for (let i = 0; i < cantidadRegistros * 2; i++) {
                busquedas.setEstructura(estructura[i]);
                if (busquedas.validarRegistro(clave)) {
                    existe = true;
                    break;
                }
            }
            if (!existe) {
                let registro = new Registro(clave);
                estructuraGuardada.insertarRegistro(registro);
                if (estructura[0].registros[posicion] === undefined) {
                    estructura[0].insertarRegistroEnPosicion(registro, posicion);
                    registrosInsertados++;
                    //Colisiona
                } else {
                    //llena todas las posiciones hasta que no quede más cantidad de registros
                    for (let i = 1; i < cantidadRegistros; i++) {
                        alert("La clave ha colisionado con la clave " + estructura[i - 1].registros[posicion].getClave() + " en la posición" + posicion + ".");
                        if (estructura[i].registros[posicion] === undefined) {
                            alert("Se insertará la clave en el registro" + i + " de la posición " + posicion + ".");

                            estructura[i].insertarRegistroEnPosicion(registro, posicion);
                            insertoEstructura = true;
                            registrosInsertados++;
                            break;
                        }
                    }
                    if (!insertoEstructura) {
                        alert("No queda espacio dentro de la estructura. Se guardará para la próxima inserción.");
                        //Inserta fuera de la estructura, pero igualmente la guarda para los cálculos
                        for (let i = cantidadRegistros - 1; i < cantidadRegistros * 2; i++) {
                            if (estructura[i].registros[posicion] === undefined) {
                                estructura[i].insertarRegistroEnPosicion(registro, posicion);
                                registrosInsertados++;
                                break;
                            }
                        }
                    }
                }
                localStorage.setItem('estructuraData', JSON.stringify(estructuraGuardada));

                console.log(ValidarEstructura());


            } else {
                alert("La clave ya existe dentro de la estructura.");
            }
        } else {
            alert("La longitud de la clave no coincide con la longitud ingresada.");
        }


        eliminarClaveButton.disabled = false;
        buscarClavePanel.style.display = "block";
        calcularDensidadDeOcupacionExpansion();
        mostrarTabla();

    } else {
        alert("Ingrese una clave válida");
    }
});

function calcularDensidadDeOcupacionExpansion() {
    densidadOcupacion = (registrosInsertados / (cantidadCubetas * cantidadRegistros)) * 100;
    console.log("RI: " + registrosInsertados);
    console.log(densidadOcupacion);
    if (densidadOcupacion >= densidadOcupacionExpansion) {
        alert("Se insertará la clave y se expandirá la estructura en 3 segundos.");
        setTimeout(delayExpansion, 3000);
    }
}

function delayExpansion() {
    switch (tipoExpansion) {
        case "expansionTotal":
            expansionTotal(2, estructura, cantidadCubetas, cantidadRegistros);
            estructura = reinsertarRegistros(funcionHash, cantidadCubetas * 2, cantidadRegistros);
            break;
        case "expansionParcial":

            expansionTotal(1.5, estructura, cantidadCubetas, cantidadRegistros);
            estructura = reinsertarRegistros(funcionHash, cantidadCubetas * 1.5, cantidadRegistros);
            break;
    }
    //expansionTotal(estructura, cantidadCubetas, cantidadRegistros);
    //estructura = reinsertarRegistros(funcionHash, cantidadCubetas * 2, cantidadRegistros);
    console.log("----YA----");
    console.log(estructura);

    cantidadCubetas = estructura[0].registros.length;
    //cantidadRegistros = estructura.length;
    console.log("XD");
    console.log("EXPANSION");
    mostrarTabla();
}

eliminarClaveButton.addEventListener("click", () => {

    const clave = parseInt(claveInput.value);
    let existe = false;
    if (claveInput.value != "" || clave > 0) {
        const posicion = funcionHashMetodo.calcularPosicion(funcionHash, clave, cantidadCubetas);
        //validar la clave en la estructura
        let i = 0;
        for (i = 0; i < cantidadRegistros * 2; i++) {
            busquedas.setEstructura(estructura[i]);
            if (busquedas.validarRegistro(clave)) {
                existe = true;
                break;
            }
        }
        if (existe) {
            estructura[i].registros[posicion] = undefined;
            // estructura[i].clavesInsertadas --;
            registrosInsertados--;
            mostrarTabla();
            estructuraGuardada.eliminarRegistro(clave);
            localStorage.setItem('estructuraData', JSON.stringify(estructuraGuardada));

            if (cantidadCubetas > cantidadCubetasIniciales) {
                calcularDensidadDeOcupacionReduccion();
            }


        } else {
            alert("La clave no existe en la estructura.");
        }
    } else {
        alert("Ingrese una clave válida.");
    }
});


function calcularDensidadDeOcupacionReduccion() {
    densidadOcupacion = (registrosInsertados / cantidadCubetas) * 100;
    console.log(densidadOcupacion + "% REDUCCION");
    if (densidadOcupacion <= densidadOcupacionReduccion) {
        alert("Se eliminiará la clave y se reducirá la estructura en 3 segundos.");
        setTimeout(delayReduccion, 3000);
        console.log("Reduccion");
    }
}

function delayReduccion() {
   
    reduccionTotal(factorExpansionReduccion, estructura, cantidadCubetas, cantidadRegistros);
    estructura = reinsertarRegistros(funcionHash, cantidadCubetas / factorExpansionReduccion, cantidadRegistros);
    console.log("----YA REDUCIDO----");
    console.log(estructura);

    cantidadCubetas = estructura[0].registros.length;
    //cantidadRegistros = estructura.length;
    console.log("REDUCCION FINALIZDA");
    mostrarTabla();
}

buscarClaveButton.addEventListener("click", () => {
    const clave = parseInt(buscarClaveInput.value);
    if(buscarClaveInput != "" || clave > 0){
        const posicion = funcionHashMetodo.calcularPosicion(funcionHash, clave, cantidadCubetas);

        for (let i = 0; i < cantidadRegistros * 2; i++) {
            if (estructura[i].registros[posicion] !== undefined && estructura[i].registros[posicion].getClave() === clave) {
                alert("La clave " + clave + " se encontró en el registro " + (i+1) + " de la cubeta " + posicion);
                return;
            }
        }
        alert("No se encontró la clave en la estructura.");
    }else{
        alert("Ingrese una clave de búsqueda válida (Mayor a 0).");
    }
    buscarClaveInput.focus();
});

function mostrarTabla() {

    tabla.innerHTML = "";
    const apertura = "<td>";
    const cierre = "</td>";
    let cubetas = "";
    for (let i = 0; i < cantidadCubetas; i++) {
        //Inserta las columnas para la cantidad de cubetas
        cubetas += apertura + i + cierre;
        //console.log("Cubeta: " + i);
    }
    tabla.insertRow(0).innerHTML = "<tr><th>Cubeta</th>" + cubetas + "</tr>";

    for (let i = 0; i < cantidadRegistros; i++) {
        const row = document.createElement("tr");
        let reg = "<th>Registro "+ (i+1) + "</th>";

        for (let j = 0; j < cantidadCubetas; j++) {

           // console.log("Registro: " + j);
            if (estructura[i].registros[j] === undefined) {
                reg += "<td>-</td>";
            } else {
                reg += "<td>" + estructura[i].registros[j].getClave() + "</td>";

            }


        }
        row.innerHTML = reg;
        tabla.append(row);

    }
    for (let i = cantidadRegistros; i < cantidadRegistros * 2; i++) {
        const row = document.createElement("tr");
        let reg = "<td style='border: 0px;'></td>";
        for (let j = 0; j < cantidadCubetas; j++) {

           // console.log("Registro: " + j);
            if (estructura[i].registros[j] === undefined) {
                reg += "<td style='border: 0px'></td></td>";
            } else {
                reg += "<td>" + estructura[i].registros[j].getClave() + "</td>";

            }
        }
        row.innerHTML = reg;
        tabla.append(row);

    }
}




