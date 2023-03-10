import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import {homeRoutes} from "@modules/home/home-routing.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    IndexComponent
  ],
    imports: [
        homeRoutes,
        CommonModule,
        MatButtonModule
    ]
})
export class HomeModule { }
