import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentProfileComponent } from './pages/tournament-profile/tournament-profile.component';
import {TournamentsRoutingModule} from "@modules/tournaments/tournaments-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import { CreateComponent } from './crud/create/create.component';
import {ReactiveFormsModule} from "@angular/forms";
import { tournamentRoutes } from "@modules/tournaments/tournaments-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    CreateComponent,
    TournamentProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    tournamentRoutes,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    TournamentsRoutingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatButtonModule,
  ]
})
export class TournamentsModule { }
