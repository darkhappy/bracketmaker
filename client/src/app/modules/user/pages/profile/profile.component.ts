import { Component } from '@angular/core';
import { UserService } from '@data/services/user.service';
import {User} from "@data/schemas/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User = {
    username: '',
    email: '',
    display_name: '',
    subscriptions: [''],
    tournaments: [''],
    about: '',
    showEmail: false,
    avatar: '',
  }
  visitor = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (history.state.username != undefined) {
      this.visitor = true;
      this.userService.getProfile(history.state.username).subscribe({
        next: (user) => {
          this.user = {
            ...this.user,
            username: user.username,
            email: user.email,
            display_name: user.display_name,
            about: user.about,
            showEmail: user.show_email,
            avatar: user.avatar,
          };
          if (!this.user.showEmail) {
            this.user.email = '';
          }
        }
      });
    } else {
      this.userService.getUser().subscribe({
        next: user => {
          this.user = {
            ...this.user,
            username: user.username,
            email: user.email,
            display_name: user.display_name,
            about: user.about,
            showEmail: user.showEmail,
            avatar: user.avatar,
          };
          if (!this.user.showEmail) {
            this.user.email = '';
          }
        },
        error: (error) => {
        }
      });
    }
  }
  updateProfile(user: any) {
    this.user = user;
  }
}
