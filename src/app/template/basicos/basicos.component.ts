import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miForm!: NgForm;

  initDataForm = {
    nombre: 'Canelones con tomate',
    precio: 10,
    existencias: 200
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return  this.miForm?.controls['nombre']?.invalid &&
            this.miForm?.controls['nombre']?.touched;
  }

  precioValido(): boolean {
    return this.miForm?.controls['precio']?.touched &&
           this.miForm?.controls['precio']?.value < 0;
  }

  guardar() {
    console.log( this.miForm.value );
    
    this.miForm.resetForm({
      precio: 0,
      existencias: 0
    });
  }

}
