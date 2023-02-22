import { Component } from '@angular/core';
import { User } from '@data/schemas/user';
import { UserService } from '@data/services/user.service';
import { Input } from '@angular/core';
import {FileUploadService} from "@data/services/file-upload.service";

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
  constructor(private userService : UserService, private fileUploadService: FileUploadService) { }

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

  changeAvatar(event: any) {
    const file = event.target.files[0];
    this.fileUploadService.uploadAvatar(file, 'userTEST').subscribe({
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
