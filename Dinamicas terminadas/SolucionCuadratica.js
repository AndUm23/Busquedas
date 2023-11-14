export default class SolucionCuadratica{

    constructor(registros){
        this.registros = registros;
    }

    insertarRegistro(posicion) {
        console.log("Solucion cuadratica");
        console.log(this.registros.length);
        let nuevaPosicion = 0;
        let i = 1
        do{
            nuevaPosicion = (posicion + (i * i)) % this.registros.length;
            console.log("pos: " + posicion + ", icuadrado: " + (i * i) + ", nuevapos:" + nuevaPosicion );
            i++;
            if (this.registros[nuevaPosicion] === undefined) {
                return nuevaPosicion;
            }
            
        }while(this.registros[nuevaPosicion] != undefined);

        return -1;
    }    

    buscarRegistro(posicion, claveBusqueda) {
        console.log("Solucion cuadratic BUSCAR");
        console.log(this.registros.length);
        let iteraciones = 1;
        let nuevaPosicion = 0;
        let i = 1
        do{
            iteraciones++;
            nuevaPosicion = (posicion + (i * i)) % this.registros.length;
            console.log("pos: " + posicion + ", icuadrado: " + (i * i) + ", nuevapos:" + nuevaPosicion );
            i++;
            if (this.registros[nuevaPosicion] !== undefined && this.registros[nuevaPosicion].getClave() === claveBusqueda) {
                return [nuevaPosicion, iteraciones];
            }
            
        }while(this.registros[nuevaPosicion] != undefined);

        return [-1,0];
    }
    
}