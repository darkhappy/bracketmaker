import {Component} from '@angular/core';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';
import {FileUploadService} from "@data/services/file-upload.service";
import {User} from "@data/schemas/user";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { AuthService } from '@data/services/auth.service';

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
  userId: string = '';
  avatarPath: string = '';
  timeStamp: number = 0;
  constructor(private userService : UserService) { }

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
      }); */
      
    }
  }
}
