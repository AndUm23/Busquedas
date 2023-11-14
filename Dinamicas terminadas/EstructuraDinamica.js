import Estructura from "./Estructura.js";
import Registro from "./Registro.js";
import FuncionHash from "./FuncionHash.js";

let estructuraRegistrosAux;
let estructuraNueva = [];

export function expansionTotal(factor, estructuraOriginal, cantidadCubetas, cantidadRegistros) {
    console.log("---ANTES EXPANSION---");
    console.log(estructuraOriginal);

    console.log("---INICIANDO EXPANSION---");
    // const cantidadCubetas = estructuraOriginal[0].lenght;
    //const cantidadRegistros = estructuraOriginal.lenght;
    console.log("CC: " + cantidadCubetas + " - CR: " + cantidadRegistros);

    estructuraNueva = expandirEstructura(factor, cantidadCubetas, cantidadRegistros);

    estructuraRegistrosAux = new Estructura();
    estructuraRegistrosAux.inicializarEstructura(cantidadCubetas * cantidadRegistros * 2);

    for (let i = 0; i < cantidadRegistros * 2; i++) {
        for (let j = 0; j < cantidadCubetas; j++) {
            if (estructuraOriginal[i].registros[j] !== undefined) {
                //Estructura auxiliar para guardar todos los registros insertados
                let registro = new Registro(estructuraOriginal[i].registros[j].getClave());
                estructuraRegistrosAux.insertarRegistro(registro);
            }
        }

    }
    console.log("---ESTRUCTURA DE REGISTROS AUX---");
    console.log(estructuraRegistrosAux);
}

export function reduccionTotal(factor, estructuraOriginal, cantidadCubetas, cantidadRegistros) {
    console.log("---ANTES REDUCCION---");
    console.log(estructuraOriginal);

    console.log("---INICIANDO REDUCCION---");
    // const cantidadCubetas = estructuraOriginal[0].lenght;
    //const cantidadRegistros = estructuraOriginal.lenght;
    console.log("CC: " + cantidadCubetas + " - CR: " + cantidadRegistros);
    estructuraNueva = reducirEstructura(factor, cantidadCubetas, cantidadRegistros);

    estructuraRegistrosAux = new Estructura();
    estructuraRegistrosAux.inicializarEstructura(cantidadCubetas * cantidadRegistros * 2);

    for (let i = 0; i < cantidadRegistros * 2; i++) {
        for (let j = 0; j < cantidadCubetas; j++) {
            if (estructuraOriginal[i].registros[j] !== undefined) {
                //Estructura auxiliar para guardar todos los registros insertados
                let registro = new Registro(estructuraOriginal[i].registros[j].getClave());
                estructuraRegistrosAux.insertarRegistro(registro);
            }
        }

    }
    console.log("---ESTRUCTURA DE REGISTROS AUX---");
    console.log(estructuraRegistrosAux);
}

export function reinsertarRegistros(funcionHash, cantidadCubetas, cantidadRegistros) {
    cantidadCubetas = Math.floor(cantidadCubetas);

    let funcionHashMetodo = new FuncionHash();
    let insertoEstructura = false;
    //Si se obtiene una estructura cargada, se reinsertan los registros según la función hash seleccionada
    //Y Según el método de solución de colisiones
    for (let i = 0; i < estructuraRegistrosAux.clavesInsertadas; i++) {
        const posicion = funcionHashMetodo.calcularPosicion(funcionHash, estructuraRegistrosAux.registros[i].getClave(), cantidadCubetas);
        let registro = new Registro(estructuraRegistrosAux.registros[i].getClave());
        if (estructuraNueva[0].registros[posicion] === undefined) {
            estructuraNueva[0].insertarRegistroEnPosicion(registro, posicion);

        } else {
            //llena todas las posiciones hasta que no quede más cantidad de registros
            for (let j = 1; j < cantidadRegistros * 2; j++) {
                if (estructuraNueva[j].registros[posicion] === undefined) {
                    estructuraNueva[j].insertarRegistroEnPosicion(registro, posicion);
                    insertoEstructura = true;
                    // registrosInsertados++;
                    break;
                }
            }

        }

    }
    return estructuraNueva;
}

function expandirEstructura(factor, cantidadCubetas, cantidadRegistros) {
    let estructura = [];
    cantidadCubetas *= factor; //2 ó 1.5
    cantidadCubetas = Math.floor(cantidadCubetas);


    console.log("ERE CC: " + cantidadCubetas);

    for (let i = 0; i < cantidadRegistros * 2; i++) {
        estructura[i] = new Estructura();
        estructura[i].inicializarEstructura(cantidadCubetas);
    }
    console.log("---EXPANDIDO---");
    console.log("Factor: " + factor + " - CC: " + cantidadCubetas + " - CR: " + cantidadRegistros);
    console.log(estructura);
    return estructura;
}

function reducirEstructura(factor, cantidadCubetas, cantidadRegistros) {
    let estructura = [];
    cantidadCubetas /= factor; //2 ó 1.5
    cantidadCubetas = Math.ceil(cantidadCubetas);


    console.log("ERE CC: " + cantidadCubetas);

    for (let i = 0; i < cantidadRegistros * 2; i++) {
        estructura[i] = new Estructura();
        estructura[i].inicializarEstructura(cantidadCubetas);
    }
    console.log("---REDUCIDO---");
    console.log("Factor: " + factor + " - CC: " + cantidadCubetas + " - CR: " + cantidadRegistros);
    console.log(estructura);
    return estructura;
}