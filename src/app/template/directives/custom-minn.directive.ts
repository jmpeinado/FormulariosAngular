import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[customMin][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator {

    // Atributos que vendrán definidos en el elemento html
    @Input() minimo!: number;

    validate(control: FormControl): ValidationErrors | null {
        if (control.value < this.minimo) {
            return {'customMin': true};
        }
        return null;
    }
}