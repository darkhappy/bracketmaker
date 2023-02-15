import { Component } from '@angular/core';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-view-users-card-list',
  templateUrl: './view-users-card-list.component.html',
  styleUrls: ['./view-users-card-list.component.scss']
})
export class ViewUsersCardListComponent {
  users : any[] = [];

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
