import { Component } from '@angular/core';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';
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

  userId: string = '';
  constructor(private userService : UserService, private fileUploadService: FileUploadService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const SESSION_INFO = this.cookieService.get('sessioninfo');
    const SESSION_INFO_JSON = JSON.parse(SESSION_INFO);
    this.userId = SESSION_INFO_JSON.id;
  }

  changeAvatar(event: any) {
    const file = event.target.files[0];
    const extension = file.name.split('.')[1];
    const filName = `${this.userId}.${extension}`;
    const formData = new FormData();
    formData.append('img', file, filName);
    this.fileUploadService.uploadAvatar(formData).subscribe({
      next: (res) => {
        this.user.avatar = res;
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

}
