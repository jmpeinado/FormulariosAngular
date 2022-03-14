import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3)], ],
    favoritos: this.fb.array([
      ['Canelones', Validators.required],
      ['Tortilla', Validators.required]
    ], [ Validators.required, Validators.minLength(2) ])
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    return this.miForm.get('favoritos') as FormArray;
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Probar a cargar los favoritos simulando que vienen desde un servicio
    let favoritosObs = of(['canelones', 'macarrones']);
    favoritosObs.subscribe( result => {
      // let controlArr: FormControl[] = [];
      // result.forEach(element => {
      //   controlArr.push( this.fb.control( element, Validators.required ) )
      // });
      // let favArr = this.fb.array(controlArr, Validators.required);
      // this.miForm.addControl( 'favoritos': favArr );
    })
  }

  campoNoValido( campo:string ) {
    return this.miForm.controls[campo].invalid && this.miForm.controls[campo].touched;
  }

  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) return;

    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required) );
    this.nuevoFavorito.reset();
  }

  eliminarFavorito( index: number ) {
    this.favoritosArr.removeAt( index )

  }

  guardar() {
    if ( this.miForm.invalid ) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log('Guardando ...');
    this.miForm.reset();
  }
}
