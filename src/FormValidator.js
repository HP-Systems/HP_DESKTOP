// src/utils/FormValidator.js

class FormValidator {
    constructor(validaciones = {}) {
      this.validaciones = validaciones;
    }
  
    validar(form) {
        try{
            const errores = {};
            for (let key in form) {
              errores[key] = [];
              if (this.validaciones[key]) {
                const reglas = this.validaciones[key];
                if (reglas.required && !form[key]) {
                  errores[key].push('Campo obligatorio');
                }
                if (reglas.email && form[key] && !form[key].includes('@')) {
                  errores[key].push('Email no válido');
                }
                if (reglas.min && form[key].length < reglas.min) {
                  errores[key].push('Mínimo de ' + reglas.min + ' caracteres');
                }
                if (reglas.max && form[key].length > reglas.max) {
                  errores[key].push('Máximo de ' + reglas.max + ' caracteres');
                }
                if (reglas.date) {
                  let date = new Date(form[key]);
                  if (date == 'Invalid Date') {
                    errores[key].push('Fecha no válida');
                  }
                }
                if (reglas.number && isNaN(form[key])) {
                  errores[key].push('Debe ser un número');
                }
              }
            }
            return errores;
        }
        catch (error){
            console.error(error);
        }
    }
}
  
  export default FormValidator;
  
  