import { Component } from '@angular/core';
import {
  faBoxArchive,
  faUsers,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent {
  boxArchive = faBoxArchive;
  users = faUsers;
  gear = faGear;
  user = faUser;
}
