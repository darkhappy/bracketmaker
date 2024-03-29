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
  sort : string = 'Aucun';
  organizers : any[] = []

  constructor(private userService: UserService) {
  }

  // initialisation de la liste des organisateurs
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.organizers = users;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // tri des organisateurs
  onOptionsSelected() {
    switch (this.sort) {
      case 'Aucun':
        this.ngOnInit();
        break
      case 'A-Z':
        this.organizers.sort((a, b) => {
          if (a.username < b.username) {
            return -1;
          }
          if (a.username > b.username) {
            return 1;
          }
          return 0;
        });
        break
      case 'Z-A':
        this.organizers.sort((a, b) => {
          if (a.username > b.username) {
            return -1;
          }
          if (a.username < b.username) {
            return 1;
          }
          return 0;
        });
        break

      case 'Populaires':
        this.organizers.sort((a, b) => {
          if (a.subscriptions.length > b.subscriptions.length) {
            return -1;
          }
          if (a.subscriptions.length < b.subscriptions.length) {
            return 1;
          }
          return 0;
        });
        break
      case 'Moins populaires':
        this.organizers.sort((a, b) => {
          if (a.subscriptions.length < b.subscriptions.length) {
            return -1;
          }
          if (a.subscriptions.length > b.subscriptions.length) {
            return 1;
          }
          return 0;
        });
        break
      default:
        break;
    }
  }

  // recherche d'un organisateur
  onSearchChange() {
    this.userService.searchUsers(this.search).subscribe({
      next: (users) => {

        this.organizers = users;
      }
    });
  }
}
