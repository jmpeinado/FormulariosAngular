import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string,
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  nuevoJuego!: string;

  persona: Persona = {
    nombre: 'javi',
    favoritos: [
      { id: 1, nombre: 'Metal gear'},
      { id: 2, nombre: 'The Witcher'},
      { id: 3, nombre: 'The Witcher 3'}
    ]
  };

  @ViewChild('miFormulario') miForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    
    console.log('Guardar...');
    
  }

  nombreInvalido() {
    return this.miForm?.controls['nombre']?.invalid;
  }

  eliminar( index: number ) {
    this.persona.favoritos.splice(index, 1);
  }

  agregarFavorito() {
    let nuevoJuego: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    
    // Mandamos una copia, en vez de mandar el objeto por referencia
    this.persona.favoritos.push( {...nuevoJuego} );
    // Se limpia el campo de agregar
    this.nuevoJuego = '';
  }
}
