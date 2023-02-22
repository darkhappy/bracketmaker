import { Component } from '@angular/core';
import {faCalendar, faEnvelope, faEye, faShare, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {TournamentService} from "@data/services/tournament.service";
import {TournamentModel} from "@data/schemas/tournament.model";
import {UserService} from "@data/services/user.service";
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
  //@ts-ignore
  tournament: TournamentModel;
  organiserName: string = "";

  public href: string = "";

  constructor(private router: Router, private tournamentService: TournamentService, private userService: UserService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    let urlArray = this.href.split('/')
    this.tournamentService.getTournament(urlArray[2]).subscribe({
      next: res => {
        //@ts-ignore
        this.tournament = res.tournament
        //todo: get tournament organiser name, fix date format
      },
      error: (error) => {
        if(error.status === 404){
          alert(error.error.message);
        } else if(error.status === 500){
          alert("Internal server error");
        }
      }
    });
  }

  getOrganiserName() {
    this.userService.getUser(this.tournament.organiserID).subscribe({
      next: res => {
        //@ts-ignore
        this.organiserName = res.user.username
      },
      error: (error) => {
        if(error.status === 404){
          alert(error.error.message);
        } else if(error.status === 500){
          alert("Internal server error");
        }
      }
    });
  }
}

