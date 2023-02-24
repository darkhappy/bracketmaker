import { Component } from '@angular/core';
import { TournamentService } from "@data/services/tournament.service";
import { TournamentModel } from "@data/schemas/tournament.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent {
  tournaments!: TournamentModel[];

  constructor(private tournamentService: TournamentService, private router: Router) {
  }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
      }
    });
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }
}
