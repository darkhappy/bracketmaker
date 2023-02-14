import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '@modules/user/components/forms/change-password/change-password.component';

@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.scss']
})
export class SettingsSecurityComponent {
  constructor() {}
  oldPassword: string = '';
  newPassword: string = '';
  openDialog() {
  }
}
