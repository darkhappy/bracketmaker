import {Component} from '@angular/core';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';
import { AuthService } from '@data/services/auth.service';
import { Router } from '@angular/router';
import {FileUploadService} from "@data/services/file-upload.service";
import {User} from "@data/schemas/user";
import {CookieService} from "ngx-cookie-service";

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
  avatarPath: string = '';
  timeStamp: number = 0;
  href: string = '';
  connectedUserName: string = '';

  constructor(private userService : UserService, private authService: AuthService, private router: Router, private fileUploadService: FileUploadService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    let urlArray = this.href.split('/');

    this.userService.isFollowed(urlArray[2] == 'profile' ? this.user.username : urlArray[2] ).subscribe( {
      next: (response) => {
        this.isFollowed = response;
      }
    })

    this.userService.getUser().subscribe( {
      next: (response) => {
        this.connectedUserName = response.username as string;
        this.setLinkPicture('/api/user/avatar/' + this.user.username);
      }
    });
  }

  changeAvatar(event: { file: File }) {
    const file = event.file;
    const extension = file.name.split('.')[1];
    const fileName = `${this.connectedUserName}.${extension}`;
    const formData = new FormData();
    formData.append('img', file, fileName);
    this.fileUploadService.uploadAvatar(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.setLinkPicture('/api/user/avatar/' + this.user.username);
      },
      error: (error) => {
        if (error.status === 409) {
          console.log(error.error.message);
        } else if (error.status === 500) {
          console.log("Internal server error");
        }
      }
    });
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
      /*this.authService.followTournament(this.id).subscribe( {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    */
    }
  }


  unfollow() {
  /*
    this.userService.unfollowUser(this.user.username).subscribe( {
      next: (response) => {
        this.isFollowed = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
       */
  }
}
