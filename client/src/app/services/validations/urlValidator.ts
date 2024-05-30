import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Permitir campos vacíos, puedes ajustar esto según tus necesidades
    }

    // Expresión regular básica para verificar si tiene el formato de una URL
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!urlRegex.test(value)) {
      return { urlFormat: true };
    }

    return null; // Devuelve null si la validación es exitosa
  };
}
