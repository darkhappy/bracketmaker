import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;
  updateProfile(user: any) {
    console.log(user);
    this.user = user;
  }
}
