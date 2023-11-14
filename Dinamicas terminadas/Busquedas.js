import Estructura from "./Estructura.js";

export default class Busquedas {

    estructura;

    constructor() {
        
    }

    busquedaSecuencial(clave) {
        let registros = this.estructura.getRegistros();
        let iteraciones = 0;
        console.log(registros);
        for (let i = 0; i < registros.length; i++) {
            //Valida que exista un registro para que no arroje error
            if(registros[i] != undefined){
                iteraciones++;
                if (registros[i].getClave() === clave) {
                    return [i, iteraciones];
                }
            }
            
        }
        return [-1, iteraciones];
    }

    busquedaBinaria(clave) {
        let registrosOrdenados = this.estructura.getRegistros();
        let iteraciones = 0;
        let izquierda = 0;
        //Toma la derecha como el número de claves insertadas para que no de error cuando encuentre
        //un registro
        let derecha = this.estructura.getClavesInsertadas() - 1;
        console.log(derecha + "der");

        while (izquierda <= derecha) {
            iteraciones++;
            console.log(iteraciones);
            let medio = Math.floor((izquierda + derecha) / 2);
            
            if (registrosOrdenados[medio].getClave() === clave) {
                return [medio, iteraciones];
            } else if (registrosOrdenados[medio].getClave() < clave) {
                izquierda = medio + 1;
            } else {
                derecha = medio - 1;
            }
        }
        return [-1, iteraciones];
    }

    //Hace una búsqueda para validar si ya se encuentra la clave en la estructura
    validarRegistro(clave){
        const [posicion, iteraciones] = this.busquedaSecuencial(clave);
        console.log(posicion + " - " + iteraciones + "XD");
        if(posicion === -1){
            //La clave no está en la estructura
            return false;
        }
        //La clave está en la estructura
        return true;
    }

    setEstructura(estructura) {
        this.estructura = estructura;
    }

}
