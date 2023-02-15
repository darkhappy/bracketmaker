import { Component } from '@angular/core';
import {faCalendar, faEnvelope, faEye, faShare, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-tournament-profile',
  templateUrl: './tournament-profile.component.html',
  styleUrls: ['./tournament-profile.component.scss']
})
export class TournamentProfileComponent {
  calender = faCalendar;
  envelope = faEnvelope;
  share = faShare;
  users = faUsers
  trophy =  faTrophy;
  eye = faEye;
  name: string = 'Nom du tournois';
  organizer: string = 'DarkHappy';
  date: string = '12 février 2021';
  sport: string = 'Soccer';
  location: string = 'Lieu du tournois';
  nbPlayers: number = 16;
  privacy: string = 'Public';
  tournamentDescription: string = 'Description du tournois';

}
