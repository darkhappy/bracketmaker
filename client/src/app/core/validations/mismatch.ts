import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appMismatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: Mismatch, multi: true}]
})
export class Mismatch implements Validator {
  @Input() firstField: string = "";
  @Input() secondField: string = "";


  validate(control: AbstractControl): ValidationErrors | null {
    const firstValue = control.get(this.firstField)?.value;
    const secondValue = control.get(this.secondField)?.value;
    return firstValue && secondValue && firstValue !== secondValue ? {mismatch: true} : null;
  }
}

