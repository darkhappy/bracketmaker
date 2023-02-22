import { Component } from '@angular/core';
import {AuthService} from "@data/services/auth.service";
import { UserService } from '@data/services/user.service';
import {Router} from "@angular/router";

import {faCalendar, faEnvelope, faEye, faShare, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-tournament-profile',
  templateUrl: './tournament-profile.component.html',
  styleUrls: ['./tournament-profile.component.scss']
})
export class TournamentProfileComponent {
  id = 1
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

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  follow() {
    if (this.authService.getUserId() === null) {
      this.router.navigate(['/auth/login']);
    } else {
      /*this.authService.followTournament(this.id).subscribe( {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }); */
      
    }
  }
}
