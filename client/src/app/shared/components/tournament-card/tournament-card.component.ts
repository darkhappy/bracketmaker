import { Component, Input } from "@angular/core";
import { Tournament } from "@data/schemas/tournament";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent {
  @Input() tournament!: Tournament

  faPlayer = faUser;
  faDate = faCalendar;
}
