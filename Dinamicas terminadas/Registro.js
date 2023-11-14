export default class Registro{

    clave = 0;
    constructor(clave){
        this.clave = clave;
    }

    getClave(){
        return this.clave;
    }
}