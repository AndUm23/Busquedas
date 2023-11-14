import Estructura from "./Estructura.js";
import Registro from "./Registro.js";

export function ValidarEstructura() {
    const estructuraAlmacenada = JSON.parse(localStorage.getItem('estructuraData'));
    return estructuraAlmacenada;
}

export function CargarEstructuraGuardada() {
    const estructuraAlmacenada = JSON.parse(localStorage.getItem('estructuraData'));
    if (estructuraAlmacenada) {
        let estructura = new Estructura();
        estructura.inicializarEstructura(estructuraAlmacenada.tamaño);
        estructura.longitudClave = estructuraAlmacenada.longitudClave;
        estructura.tamaño = estructuraAlmacenada.tamaño;

        let registrosAux = estructuraAlmacenada.registros;
        for (let i = 0; i < registrosAux.length; i++) {
            if (registrosAux[i] != null) {
                let registro = new Registro(registrosAux[i].clave);
                estructura.insertarRegistro(registro);
            }

        }

        estructura.showClaves();
        return estructura;
    }
    return undefined;
}