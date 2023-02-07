import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Mismatch} from './validations/mismatch';


@NgModule({
  declarations: [
    Mismatch
  ],
  exports: [
    Mismatch
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
