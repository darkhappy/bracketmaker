import { Component, Input } from '@angular/core';

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

    ngOnInit() {
      console.log(this.user);
      if (!this.user.username) {
        this.user.username = 'Aucun';
      }
      if (!this.user.display_name) {
        this.user.display_name = 'Aucun';
      }

    } 
    view() {

    }

}