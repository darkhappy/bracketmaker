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

  // verifie si le profil est celui de l'utilisateur connecté
  @Input() isMyProfile: boolean = false;
  isFollowed: boolean = false;

  href: string = '';
  constructor(private userService : UserService, private authService: AuthService, private router: Router, private fileUploadService: FileUploadService, private cookieService: CookieService) { }

  // initialisation du composant
  ngOnInit(): void {
    this.href = this.router.url;
    let urlArray = this.href.split('/');
    this.userService.isFollowed(urlArray[2] == 'profile' ? this.user.username : urlArray[2] ).subscribe( {
      next: (response) => {
        this.isFollowed = response;
      }
    });
  }

  /*
  * Change l'avatar de l'utilisateur
  * @param event : { file: File } : fichier à envoyer
   */
  changeAvatar(event: { file: File }) {
    const file = event.file;
    const extension = file.name.split('.')[1];
    const fileName = `${this.user.username}.${extension}`;
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
  }

  // permet de suivre un utilisateur
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

  // permet de ne plus suivre un utilisateur
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
