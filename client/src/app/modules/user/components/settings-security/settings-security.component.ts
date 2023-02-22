import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '@modules/user/components/forms/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.scss']
})
export class SettingsSecurityComponent {
  constructor(private dialog: MatDialog) {}
  oldPassword: string = '';
  newPassword: string = '';
  openDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      data: {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      },
    });

    dialogRef.afterClosed().subscribe({});
  }
}
