import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users-card',
  templateUrl: './view-users-card.component.html',
  styleUrls: ['./view-users-card.component.scss']
})
export class ViewUsersCardComponent {
    @Input() user : any = {
      username: 'username',
      display_name: 'display_name',
      avatar: 'avatar',
      tournaments: [],
      subscriptions: [],
    }

    tournamentsCount : number = this.user.tournaments.length;
    subscriptionsCount : number = this.user.subscriptions.length;

    constructor(private route: Router) { }

    ngOnInit() {
      if (!this.user.display_name) {
        this.user.display_name = 'Aucun';
      }

    } 
    view() {
      this.route.navigate(['/user/' + this.user.username]);
    }

}
