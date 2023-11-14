import FuncionHash from "./FuncionHash.js";

export default class SolucionDobleHash{

    funcionHash = new FuncionHash();

    constructor(registros){
        this.registros = registros;
    }

    insertarRegistro(funcion, posicion, rango){
        console.log(funcion + " - " + posicion + " - " +rango);
        let nuevaPosicion = 0;
        //posicion = H(K) = d 
        do{
            posicion ++;
            nuevaPosicion = this.funcionHash.calcularPosicion(funcion, posicion, rango);
            console.log("DobleHash NPos: " + nuevaPosicion);
           // console.log("pos: " + posicion + ", icuadrado: " + (i * i) + ", nuevapos:" + nuevaPosicion );
           
            if (this.registros[nuevaPosicion] === undefined) {
                return nuevaPosicion;
            }
            
        }while(this.registros[nuevaPosicion] != undefined);

        return -1;
    }

    buscarRegistro(funcion, posicion, rango, claveBusqueda){
        let iteraciones = 1;
        let nuevaPosicion = 0;
        //posicion = H(K) = d 
        do{
            iteraciones++;
            posicion ++;
            nuevaPosicion = this.funcionHash.calcularPosicion(funcion, posicion, rango);
            console.log("DobleHash NPos: " + nuevaPosicion);
           // console.log("pos: " + posicion + ", icuadrado: " + (i * i) + ", nuevapos:" + nuevaPosicion );
           
            if (this.registros[nuevaPosicion].getClave() === claveBusqueda) {
                return [nuevaPosicion, iteraciones];
            }
            
        }while(this.registros[nuevaPosicion] !== undefined);

        return [-1,0];
    }

}