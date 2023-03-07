import { Component, Input} from '@angular/core';

import {
  faBoxArchive,
  faUsers,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { User } from "@data/schemas/user";

@Component({
  selector: 'app-visitor-profile-content',
  templateUrl: './visitor-profile-content.component.html',
  styleUrls: ['./visitor-profile-content.component.scss']
})
export class VisitorProfileContentComponent {
  boxArchive = faBoxArchive;
  users = faUsers;

  @Input() user: User = {
    _id: "",
    about: "",
    avatar: "",
    display_name: "",
    email: "",
    showEmail: false,
    subscriptions: [""],
    tournaments: [""],
    username: ""
  };
}
