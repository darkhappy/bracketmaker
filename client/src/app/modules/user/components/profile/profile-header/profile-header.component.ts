import { Component } from '@angular/core';
import { User } from '@data/schemas/user';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';
import { AuthService } from '@data/services/auth.service';
import { Router } from '@angular/router';

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

  @Input() isMyProfile: boolean = false;
  isFollowed: boolean = false;
  constructor(private userService : UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userService.isFollowed(this.user.username).subscribe( {
      next: (response) => {
        this.isFollowed = response;
      }
    });
  }

  changeAvatar() {
    //TODO: method to change avatar
  }

  follow() {
    if (this.authService.getUserId() === null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.userService.followUser(this.user.username).subscribe( {
        next: (response) => {
          this.isFollowed = true;
        },
        error: (error) => {
          console.log(error);
        }
      }); 
      
    } 
  }

  unfollow() {
    this.userService.unfollowUser(this.user.username).subscribe( {
      next: (response) => {
        this.isFollowed = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
