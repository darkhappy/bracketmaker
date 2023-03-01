import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    TournamentCardComponent,

    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
  ],
  exports: [
    TournamentCardComponent,
    ImageUploadComponent
  ],
})
export class SharedModule { }
