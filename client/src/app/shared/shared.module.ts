import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AlertComponent } from '@shared/alert/alert.component';
import { TournamentCardComponent } from './components/tournament-card/tournament-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TournamentCardComponent, ImageUploadComponent],
  exports: [AlertComponent, ImageUploadComponent, TournamentCardComponent],
  imports: [CommonModule, FontAwesomeModule, MatButtonModule],
})
export class SharedModule {}
