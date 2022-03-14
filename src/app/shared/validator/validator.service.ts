import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  nombrePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerJaviM( nombre:FormControl ): ValidationErrors | null {
    const nombreFormated = nombre.value?.trim().toLowerCase();
    if (nombreFormated === 'javim') {
      return {
        esJaviM: true
      }
    }

    return null;
  }

  passIguales( campo1: string, campo2: string) {

    return ( formGroup: FormGroup ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1);
      const pass2 = formGroup.get(campo2);

      if ( pass1?.value !== pass2?.value ) {
        pass2?.setErrors({ 'passwordsDiferentes': true });
        return { 'passwordsDiferentes': true }
      }
      pass2?.setErrors(null);
      return null;
    }

  }
}
