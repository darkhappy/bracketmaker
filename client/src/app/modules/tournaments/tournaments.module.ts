import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './crud/create/create.component';
import { TournamentProfileComponent } from './pages/tournament-profile/tournament-profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import { tournamentRoutes } from "@modules/tournaments/tournaments-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { UpdateTournamentComponent } from './crud/update-tournament/update-tournament.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    CreateComponent,
    UpdateTournamentComponent,
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
    MatTabsModule,
    FontAwesomeModule
  ]
})
export class TournamentsModule { }
