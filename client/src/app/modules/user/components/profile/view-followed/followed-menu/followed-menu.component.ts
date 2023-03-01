import { Component } from '@angular/core';
import {
  faBoxArchive,
  faUsers,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-followed-menu',
  templateUrl: './followed-menu.component.html',
  styleUrls: ['./followed-menu.component.scss']
})
export class FollowedMenuComponent {
  boxArchive = faBoxArchive;
  users = faUsers;
  gear = faGear;
  user = faUser;
  constructor() { }
}
