import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;
  visitor = false;
  href: string = '';
  isMyProfile: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
    let urlArray = this.href.split('/');
    if (urlArray[2] != 'profile') {
      this.visitor = true;
      this.userService.getProfile(urlArray[2]).subscribe({
        next: (user) => {
          this.user = user;
          if (!this.user.showEmail) {
            this.user.email = '';
          }
        }
      });

      this.userService.isLoggedProfile(urlArray[2]).subscribe( {
        next: (response) => {
          console.log(response);
          this.isMyProfile = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
      
    } else {
      this.userService.getUser().subscribe({
        next: user => {
          this.user = user;
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
