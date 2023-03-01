import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  href: string = '';
  isMyProfile: boolean = true;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
    let urlArray = this.href.split('/');
    if (urlArray[2] != 'profile') {
      this.visitor = true;
      this.userService.getProfile(urlArray[2]).subscribe({
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
      this.userService.isLoggedProfile(urlArray[2]).subscribe( {
        next: (response) => {
          this.isMyProfile = response;
        },
        error: (error) => {
          console.log(error);
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
