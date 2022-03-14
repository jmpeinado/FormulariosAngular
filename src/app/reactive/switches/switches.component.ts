import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [true, [Validators.required, Validators.requiredTrue]]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private fb: FormBuilder) { }

  // Nos imaginamos que los datos de persona viene de un servicio, 
  // Se rellenan en el ngOnInit
  // Se le asigna a miForm los valores de persona (los que cace)
  ngOnInit(): void {
      // Con reset los campos que coindan se setean, sin daro error si no coinciden
      this.miForm.reset( {
        ...this.persona,
        condiciones: true
      });
      // Con setValue los campos tienen que ser exactos, si falta alguno da error
      //this.miForm.setValue( this.persona );

      // La forma de tener sincronizados los cambios entre form y persona es con un Observable
      // this.miForm.valueChanges.subscribe( values => {
      //   delete values.condiciones;
      //   this.persona = values;
      // });
      // Una forma más elegante es desustrurando (condiciones y el resto)
      this.miForm.valueChanges.subscribe( ({ condiciones, ...restoParam }) => {
        this.persona = restoParam;
      });
  }

  guardar() {
    console.log('Guardando ...');
    
    const formData = {...this.miForm.value};
    delete formData.condiciones;

    this.persona = formData;
  }
}
