import { Component } from '@angular/core';
import { User } from '@data/schemas/user';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';
import { AuthService } from '@data/services/auth.service';
import { Router } from '@angular/router';
import {FileUploadService} from "@data/services/file-upload.service";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {

  @Input() user: User = {
    username: '',
    email: '',
    display_name: '',
    subscriptions: [''],
    tournaments: [''],
    about: '',
    showEmail: false,
    avatar: '',
  }

  @Input() isMyProfile: boolean = false;
  isFollowed: boolean = false;

  userId: string = '';
  avatarPath: string = '';
  timeStamp: number = 0;


  constructor(private userService : UserService, private authService: AuthService, private router: Router, private fileUploadService: FileUploadService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const SESSION_INFO = this.cookieService.get('sessioninfo');
    const SESSION_INFO_JSON = JSON.parse(SESSION_INFO);
    this.userId = SESSION_INFO_JSON.id;

    this.setLinkPicture('/api/user/avatar/' + this.userId);
    this.userService.isFollowed(this.user.username).subscribe( {
      next: (response) => {
        this.isFollowed = response;
      }
    });
  }

  changeAvatar(event: { file: File }) {
    const file = event.file;
    const extension = file.name.split('.')[1];
    const fileName = `${this.userId}.${extension}`;
    const formData = new FormData();
    formData.append('img', file, fileName);
    this.fileUploadService.uploadAvatar(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        if (error.status === 409) {
          console.log(error.error.message);
        } else if (error.status === 500) {
          console.log("Internal server error");
        }
      }
    });
    this.setLinkPicture('/api/user/avatar/' + this.userId);
  }

  getLinkPicture() {
    if(this.timeStamp) {
      return this.avatarPath + '?' + this.timeStamp;
    }
    return this.avatarPath;
  }
  setLinkPicture(url: string) {
    this.avatarPath = url;
    this.timeStamp = (new Date()).getTime();
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
