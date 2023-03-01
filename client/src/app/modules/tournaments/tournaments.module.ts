import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { SharedModule } from "@shared/shared.module";
import { CreateComponent } from './crud/create/create.component';
import { TournamentProfileComponent } from './pages/tournament-profile/tournament-profile.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import { tournamentRoutes } from "@modules/tournaments/tournaments-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    CreateComponent,
    TournamentListComponent,
    TournamentProfileComponent,
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
    SharedModule,
    MatIconModule,
    MatMenuModule,,
    FontAwesomeModule,
    MatTabsModule,
    MatButtonModule,
  ],
})
export class TournamentsModule { }
