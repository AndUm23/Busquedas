export default class SolucionLineal{

    constructor(registros){
        this.registros = registros;
    }

    insertarRegistro(posicion) {
        let nuevaPosicion = posicion;
        //lo hace desde la posición obtenida hasta el final de la estructura
        console.log(posicion + "inicial" + this.registros.length);
        while(nuevaPosicion < this.registros.length - 1){
            nuevaPosicion++;
            if(this.registros[nuevaPosicion] == undefined){
                return nuevaPosicion;
            }
        }

        //Si llegó al final y no la encontró, vuelve al inicio de la estructura y lo recorre hasta la posición
        //obtenida
        nuevaPosicion = -1;
        while(nuevaPosicion < posicion){
            nuevaPosicion++;
            if(this.registros[nuevaPosicion] == undefined){
                return nuevaPosicion;
            }
        }
        return -1;
        
    }

    buscarRegistro(posicion, claveBusqueda) {
        let nuevaPosicion = posicion;
        let iteraciones = 1;
        //lo hace desde la posición obtenida hasta el final de la estructura
        console.log(posicion + " INICIAL y " + this.registros.length);
        while(nuevaPosicion < this.registros.length - 1){
            iteraciones++;
            nuevaPosicion++;
            console.log(nuevaPosicion + " nueva posicion" + this.registros[nuevaPosicion] );
            if(this.registros[nuevaPosicion] != undefined && this.registros[nuevaPosicion].clave === claveBusqueda){
                console.log("SE ENCONTRÖ CRV");
                return [nuevaPosicion, iteraciones];
            }
        }

        //Si llegó al final y no la encontró, vuelve al inicio de la estructura y lo recorre hasta la posición
        //obtenida
        nuevaPosicion = -1;
        while(nuevaPosicion < posicion){
            nuevaPosicion++;
            if(this.registros[nuevaPosicion] != undefined && this.registros[nuevaPosicion].getClave() === claveBusqueda){
                return nuevaPosicion;
            }   
        }
        return [-1,0];
    }   

}