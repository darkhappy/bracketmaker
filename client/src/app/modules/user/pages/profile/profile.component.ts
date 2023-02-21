import { Component } from '@angular/core';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;
  visitor = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (history.state.username != undefined) {
      this.visitor = true;
      this.userService.getProfile(history.state.username).subscribe({
        next: (user) => {
          this.user = {
            username: user.username,
            email: user.email,
            display_name: user.display_name,
            about: user.about,
            showEmail: user.show_email,
            avatar: user.avatar,
          };
          console.log(this.user.showEmail);
          if (!this.user.showEmail) {
            this.user.email = '';
          }
          console.log(this.user);
        }
      });
    }
  }
  updateProfile(user: any) {
    console.log(user);
    this.user = user;
  }
}
