import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { SharedModule } from "@shared/shared.module";
import { tournamentRoutes } from "@modules/tournaments/tournament-routing.module";



@NgModule({
  declarations: [
    TournamentListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    tournamentRoutes
  ],
})
export class TournamentsModule { }
