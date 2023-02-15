import { Component } from '@angular/core';
import { User } from '@data/schemas/user';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {

  @Input() user: any = {
    username: '',
    email: '',
    display_name: '',
    about: '',
    showEmail: false,
    avatar: '',
  }
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: user => {
        this.user = {
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
        console.log(error);
      }
    });
  }
}
