import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import {homeRoutes} from "@modules/home/home-routing.module";



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    homeRoutes,
    CommonModule
  ]
})
export class HomeModule { }
