import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {AlertComponent} from "@shared/alert/alert.component";

@NgModule({
  declarations: [
    AlertComponent,
    ImageUploadComponent
  ],
  exports: [
    AlertComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
