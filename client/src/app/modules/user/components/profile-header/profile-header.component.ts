import { Component } from '@angular/core';
import { User } from '@data/schemas/user';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  user: User = {
    username: '',
    email: '',
    display_name: '',
    about: '',
    avatar: '',
    subsctiptions: [''],
    tournaments: [''],
  }
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      }
    });    
  }

}
