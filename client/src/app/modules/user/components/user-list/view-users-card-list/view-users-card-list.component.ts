import { Component, Input} from '@angular/core';
import { UserService } from '@data/services/user.service';

@Component({
  selector: 'app-view-users-card-list',
  templateUrl: './view-users-card-list.component.html',
  styleUrls: ['./view-users-card-list.component.scss']
})
export class ViewUsersCardListComponent {
  // liste des utilisateurs
  @Input() users : any[] = [];

}
