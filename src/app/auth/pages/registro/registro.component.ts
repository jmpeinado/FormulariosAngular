import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern(this.vs.nombrePattern) ] ],
    mail: ['', [ Validators.required, Validators.pattern(this.vs.emailPattern) ], [this.emailValidatorService] ],
    username: ['', [ Validators.required, this.vs.noPuedeSerJaviM ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    password2: ['', [ Validators.required] ]
  },{
    validators: [ this.vs.passIguales( 'password', 'password2' ) ]
  });

  get emailError(): string {
    const error = this.miForm.get('mail')?.errors;
    console.log(error);
    
    if ( error?.['required'] ) {
      return 'Email: requerido'
    } else if ( error?.['pattern'] ) {
      return 'Email: formato incorrecto'
    } else if ( error?.['emailUsado'] ) {
      return 'Email: ya usado'
    }
    
    return '';
  }

  constructor(private fb: FormBuilder,
            private vs: ValidatorService,
            private emailValidatorService: EmailValidatorService) { }

  ngOnInit(): void {
    this.miForm.reset({
      nombre: 'javi m',
      mail: 'javi@m.com',
      username: 'javi',
      password: '123456',
      password2: '123456'
    });
  }

  campoInvalido( campo:string ) {
    return this.miForm.get(campo)?.invalid &&
            this.miForm.get(campo)?.touched;
  }

  crearUsuario() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log('Creando usuario...');
  }
}
