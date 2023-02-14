import { Component, Input } from "@angular/core";
import { AuthService } from "@data/services/auth.service";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent {
  constructor(private authService: AuthService) { }

  onSubmit() {

  }
}
