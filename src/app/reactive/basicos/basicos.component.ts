import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  // miForm: FormGroup = new FormGroup({
  //   'nombre': new FormControl('Canelones con nata'),
  //   'precio': new FormControl(20),
  //   'existencias': new FormControl(400)
  // })

  // miForm: FormGroup = this.fb.group({
  //   nombre: [ 'VALOR', VALIDADORES SINCRONOS[], VALIDADORES ASINCRONOS[] ],

  miForm: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)], ],
    precio: [ , [Validators.required, Validators.min(0)] ],
    existencias: [ , [Validators.required, Validators.min(0)] ]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Para definir valores por defecto, mejor reset que setValue
    this.miForm.reset({
      nombre: 'Inicio'
    });
  }

  // Se puede validar todos los campos pasando el parametro
  campoNoValido( campo: string ) {
    return this.miForm.controls[campo].errors &&
           this.miForm.controls[campo].touched;
  }

  guardar() {
    if ( this.miForm.invalid ) {
      // Para 
      this.miForm.markAllAsTouched();
      return;
    }
    console.log('Guardando ...');
    this.miForm.reset();
  }

}
