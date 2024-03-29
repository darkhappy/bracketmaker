import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { SharedModule } from "@shared/shared.module";
import { TournamentProfileComponent } from './pages/tournament-profile/tournament-profile.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTabsModule} from "@angular/material/tabs";
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
import { UpdateTournamentComponent } from './crud/update-tournament/update-tournament.component';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ListOfTournamentsComponent } from './components/list-of-tournaments/list-of-tournaments.component';


@NgModule({
  declarations: [
    CreateComponent,
    TournamentProfileComponent,
    UpdateTournamentComponent,
    TournamentListComponent,
    ListOfTournamentsComponent,
  ],
  exports: [
    CreateComponent,
    TournamentListComponent,
    ListOfTournamentsComponent,
    UpdateTournamentComponent,
    TournamentProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    tournamentRoutes,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    FontAwesomeModule,
    MatTabsModule,
    MatButtonModule,
  ],
})

export class TournamentsModule { }
