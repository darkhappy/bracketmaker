import { Component } from '@angular/core';
import { TournamentService } from "@data/services/tournament.service";
import { TournamentModel } from "@data/schemas/tournament.model";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent {
  tournaments!: TournamentModel[];

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
      }
    });
  }
}
