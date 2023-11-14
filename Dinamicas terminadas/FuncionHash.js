export default class FuncionHash{

    constructor(){

    }

    calcularPosicion(funcion, clave, rango) {
        if (funcion === "modulo") {
            return (clave % rango);
        } else if (funcion === "cuadrado") {
            const cuadrado = clave * clave;
            const ceros = Math.floor(Math.log10(rango)) + 1;
            const digitos = cuadrado.toString().split("").map(Number);
            if (digitos.length >= ceros) {
                const startIndex = Math.floor((digitos.length - ceros) / 2);
                const endIndex = startIndex + ceros;
                const centrals = digitos.slice(startIndex, endIndex);
                return (Number(centrals.join("")) % rango);
            } else {
                alert("Clave no válida para esta función.");
                return -1;
            }
        } else if (funcion === "truncamiento") {
            const ceros = Math.floor(Math.log10(rango)) + 1;
            const digitos = clave.toString().split("").map(Number);
            if (digitos.length >= ceros) {
                const positions = [];
                for (let i = 0; i < ceros; i++) {
                    positions.push(digitos[i]);
                }
                return (Number(positions.join("")) % rango);
            } else {
                alert("Clave no válida para esta función.");
                return -1;
            }
        } else if (funcion === "plegamiento") {
            const ceros = Math.floor(Math.log10(rango)) + 1;
            const digitos = clave.toString().split("").map(Number);
            const groups = this.groupDigits(digitos, ceros);
            let result = 0;
            if (groups.length > 0) {
                for (let i = 0; i < groups.length; i++) {
                    if (i % 2 === 0) {
                        result += this.sumDigits(groups[i]);
                    } else {
                        result *= this.multiplyDigits(groups[i]);
                    }
                }
                return (result);
            } else {
                alert("Clave no válida para esta función.");
                return -1;
            }
        }
        return -1;
    }

    groupDigits(digits, groupSize) {
        const groups = [];
        while (digits.length > 0) {
            groups.push(digits.splice(0, groupSize));
        }
        return groups;
    }

    sumDigits(digits) {
        return digits.reduce((sum, digit) => sum + digit, 0);
    }

    multiplyDigits(digits) {
        return digits.reduce((product, digit) => product * digit, 1);
    }

}