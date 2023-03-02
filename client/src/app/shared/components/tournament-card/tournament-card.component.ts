import { Component, Input } from "@angular/core";
import { TournamentModel } from "@data/schemas/tournament.model";
import { faCalendar, faGamepad, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent {
  @Input() tournament!: TournamentModel;

  timestamp: string = new Date().toDateString();

  faPlayer = faUser;
  faDate = faCalendar;
  faType = faTrophy;
  faGame = faGamepad;

  constructor() { }

  ngOnInit(): void {
    this.timestamp = new Date(this.tournament.date).toDateString();
  }
}
