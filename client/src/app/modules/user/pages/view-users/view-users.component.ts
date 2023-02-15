import { Component } from '@angular/core';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent {
  search : string = '';
  choices : string[] = ['Aucun', 'A-Z', 'Z-A', 'Populaires', 'Moins populaires'];

  organizers : any[] = []

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.organizers = users;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
