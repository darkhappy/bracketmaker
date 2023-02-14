import { Component } from '@angular/core';
import { Tournament } from "@data/schemas/tournament";
import { TournamentService } from "@data/services/tournament.service";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent {
  tournaments!: Tournament[];

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
