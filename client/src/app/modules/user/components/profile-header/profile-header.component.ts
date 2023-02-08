import { Component } from '@angular/core';
import { User } from "@data/schemas/user";
import { UserService } from "@data/services/user.service";

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  //@ts-ignore
  user: User;

  constructor(private usersService: UserService) {

  }

  ngOnInit(): void {
    this.usersService.getUser().subscribe(user => {
      this.user = user;
    });
  }
}
