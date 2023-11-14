export default class Estructura {

    registros;
    clavesInsertadas;
    longitudClave;
    tamaño;

    constructor() {
        this.clavesInsertadas = 0;
        this.longitudClave = 0;
        this.tamaño = 0;

    }

    inicializarEstructura(tamaño) {
        this.registros = Array.from({ length: tamaño }, () => undefined); // Inicializamos la estructura con valores indefinidos
        //this.clavesInsertadas = 0;
        //this.longitudClave = 0;
        /* for(let i = 0; i < tamaño ; i++){
             this.registros[i] = undefined;
         }*/
        this.tamaño = tamaño;
    }

    insertarRegistro(registro) {
        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i] === undefined) {
                this.registros[i] = registro;
                //this.estructura.push(registro, i);
                this.clavesInsertadas++;
                return;
            }
        }

    }

    insertarRegistroEnPosicion(registro, posicion) {
        this.registros[posicion] = registro;
        this.clavesInsertadas++;
    }

    eliminarRegistro(clave) {
        let i = 0;
        for (i = 0; i < this.registros.length; i++) {
            if (this.registros[i] != undefined) {
                if (this.registros[i].clave === clave) {
                    this.registros.splice(i,1);
                    //this.registros[i] = undefined;
                    this.registros.push(undefined);
                    this.clavesInsertadas--;
                    return;
                }
            }

        }
    }

    ordenarRegistros() {

        for (let i = 0; i < this.registros.length; i++) {


            // Last i elements are already in place 
            for (let j = 0; j < (this.registros.length - i - 1); j++) {
                /*if (this.registros[j] === undefined && this.registros[j + 1] != undefined) {
                    this.registros[j] = this.registros[j + 1];
                }*/

                //Valida que no esten indefinidos los valores para hacer la busqueda
                if (this.registros[j] != undefined && this.registros[j + 1] != undefined) {
                    if (this.registros[j].clave > this.registros[j + 1].clave) {

                        // If the condition is true 
                        // then swap them 
                        let temp = this.registros[j]
                        this.registros[j] = this.registros[j + 1]
                        this.registros[j + 1] = temp
                    }
                }

            }
        }


    }

    showClaves() {
        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i] != undefined) {
                console.log("POS - [" + i + "] = " + this.registros[i].clave);
            }
        }
    }

    getRegistros() {
        return this.registros;
    }

    setRegistros(registros) {
        this.registros = registros;
    }

    getTamaño() {
        return this.registros.length;
    }

    getClavesInsertadas() {
        return this.clavesInsertadas;
    }
}