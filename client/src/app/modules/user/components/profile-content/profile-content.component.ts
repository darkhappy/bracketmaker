import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent {

  @Output() event = new EventEmitter<any>();
  updateProfile(user: any) {
    this.event.emit(user);
  }
}
