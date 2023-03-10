import { Component } from '@angular/core';
import {AuthService} from "@data/services/auth.service";
import { UserService } from '@data/services/user.service';
import {Router} from "@angular/router";

import {faCalendar, faEnvelope, faEye, faShare, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {TournamentService} from "@data/services/tournament.service";
import {TournamentModel} from "@data/schemas/tournament.model";
@Component({
  selector: 'app-tournament-profile',
  templateUrl: './tournament-profile.component.html',
  styleUrls: ['./tournament-profile.component.scss']
})
export class TournamentProfileComponent {
  //@ts-ignore
  tournament: TournamentModel = new TournamentModel();
  id = "1"
  calender = faCalendar;
  envelope = faEnvelope;
  share = faShare;
  users = faUsers
  trophy = faTrophy;
  eye = faEye;
  organiserName: string = "";
  idTournoi: String = "";

  public href: string = "";

  isFollowed: boolean = false;

  constructor(private router: Router, private tournamentService: TournamentService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.href = this.router.url;
    let urlArray = this.href.split('/')
    this.idTournoi = urlArray[3]
    this.tournamentService.getTournament(urlArray[3]).subscribe({
      next: res => {
        //@ts-ignore
        this.tournament = res.tournament
        //todo: get tournament organiser name, fix date format
      },
      error: (error) => {
        if (error.status === 404) {
          alert(error.error.message);
        } else if (error.status === 500) {
          alert("Internal server error");
        }
      }
    });

    this.tournamentService.isFollowed(urlArray[2]).subscribe({
      next: (response) => {
        this.isFollowed = response;
      }
    });

  }

  getOrganiserName() {
    this.userService.getUserById(this.tournament.organizer_id).subscribe({
      next: res => {
        //@ts-ignore
        this.organiserName = res.user.username
      },
      error: (error) => {
        if (error.status === 404) {
          alert(error.error.message);
        } else if (error.status === 500) {
          alert("Internal server error");
        }
      }
    });
  }


  navigate(path: string) {
    this.router.navigate([path, this.idTournoi]);
  }
    follow()
    {
      if (this.authService.getUserId() === null) {
        this.router.navigate(['/auth/login']);
      } else {
        this.tournamentService.followTournament(this.tournament._id).subscribe({
          next: (response) => {
            this.isFollowed = true;
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }

    unfollow()
    {
      this.tournamentService.unfollowTournament(this.tournament._id).subscribe({
        next: (response) => {
          this.isFollowed = false;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
}

