import SolucionLineal from "./SolucionLineal.js";
import SolucionCuadratica from "./SolucionCuadratica.js";
import SolucionDobleHash from "./SolucionDobleHash.js";

export default class SolucionColision{

    registros = [];
    constructor(registrosAux){
        this.registros = registrosAux;
        console.log(this.registros);
    }

    solucionarColisionInsercion(metodo, posicion, funcion){
        let nuevaPosicion = 0;
        switch(metodo){
            case "lineal":
                let solucionLineal = new SolucionLineal(this.registros);
                console.log("lineal");
                console.log(this.registros);
                nuevaPosicion = solucionLineal.insertarRegistro(posicion);
                return nuevaPosicion;
                break;
            case "cuadratica":
                console.log("cuadratica");
                console.log("solucion colision estructura");
                console.log(this.registros);
                let solucionCuadratica = new SolucionCuadratica(this.registros);
                nuevaPosicion = solucionCuadratica.insertarRegistro(posicion);
                return nuevaPosicion;
                break;
            case "dobleHash":
                let solucionDobleHash = new SolucionDobleHash(this.registros);
                nuevaPosicion = solucionDobleHash.insertarRegistro(funcion, posicion, this.registros.length);
                return nuevaPosicion;
                break;
            
        }
    }

    solucionarColisionBusqueda(metodo, posicion, funcion, claveBusqueda){
        let nuevaPosicion = 0;
        switch(metodo){
            case "lineal":
                let solucionLineal = new SolucionLineal(this.registros);
                console.log("lineal buscar");
                console.log(this.registros);
               // nuevaPosicion = solucionLineal.buscarRegistro(posicion, claveBusqueda);
                //console.log("SE ENCONTRÖ EN: " + nuevaPosicion);
                return solucionLineal.buscarRegistro(posicion, claveBusqueda);
                break;
            case "cuadratica":
                console.log("cuadratica buscar");
                console.log("solucion colision estructura");
                console.log(this.registros);
                let solucionCuadratica = new SolucionCuadratica(this.registros);
               // nuevaPosicion = solucionCuadratica.buscarRegistro(posicion);
                return solucionCuadratica.buscarRegistro(posicion, claveBusqueda);
                break;
            case "dobleHash":
                let solucionDobleHash = new SolucionDobleHash(this.registros);
                nuevaPosicion = solucionDobleHash.buscarRegistro(funcion, posicion, this.registros.length, claveBusqueda);
                return nuevaPosicion;
                break;
            
        }
    }

}