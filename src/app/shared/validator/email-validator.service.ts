import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const mail = control.value;

    return this.http.get<any>(`http://localhost:3000/usuarios?q=${mail}`)
      .pipe(
        delay(2000),
        map( result => {
          if (result.length) {
            return {'emailUsado': true};
          } else {
            return null;
          }
        })
      );
  }
}
