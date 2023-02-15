import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentProfileComponent } from './pages/tournament-profile/tournament-profile.component';
import {TournamentsRoutingModule} from "@modules/tournaments/tournaments-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
@NgModule({
  declarations: [
    TournamentProfileComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatButtonModule,
  ]
})
export class TournamentsModule { }
