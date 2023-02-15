import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './crud/create/create.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CreateComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class TournamentsModule { }
