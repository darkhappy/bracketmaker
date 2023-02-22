import { Component, Input } from "@angular/core";
import { TournamentModel } from "@data/schemas/tournament.model";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent {
  @Input() tournament!: TournamentModel;

  faPlayer = faUser;
  faDate = faCalendar;
}
