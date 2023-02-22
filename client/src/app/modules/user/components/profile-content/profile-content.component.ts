import {
  faBoxArchive,
  faUsers,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Component, Output, EventEmitter, Input} from '@angular/core';

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

  @Input() visitor: Boolean = false;

  @Output() event = new EventEmitter<any>();
  updateProfile(user: any) {
    this.event.emit(user);
  }
}
