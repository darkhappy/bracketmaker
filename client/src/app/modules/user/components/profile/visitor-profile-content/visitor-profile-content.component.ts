import { Component, Input} from '@angular/core';

import {
  faBoxArchive,
  faUsers,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visitor-profile-content',
  templateUrl: './visitor-profile-content.component.html',
  styleUrls: ['./visitor-profile-content.component.scss']
})
export class VisitorProfileContentComponent {
  boxArchive = faBoxArchive;
  users = faUsers;

  @Input() user: any = {};
}
