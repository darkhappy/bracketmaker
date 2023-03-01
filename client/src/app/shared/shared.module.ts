import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    TournamentCardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
  ],
  exports: [
    TournamentCardComponent,
  ],
})
export class SharedModule { }
