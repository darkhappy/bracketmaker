import { Component, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ChangeUsernameComponent } from "@modules/user/components/forms/change-username/change-username.component";
import { ChangeEmailComponent } from "@modules/user/components/forms/change-email/change-email-component";
import { AuthService } from "@data/services/auth.service";
import { UserService } from "@data/services/user.service";
import { User } from "@data/schemas/user";

@Component({
  selector: "app-settings-account",
  templateUrl: "./settings-account.component.html",
  styleUrls: ["./settings-account.component.scss"],
})
export class SettingsAccountComponent {
  constructor(private matDialog: MatDialog, private userService: UserService) {
  }

  // Changement du nom d'utilisateur
  onEditUsername() {
    this.matDialog.open(ChangeUsernameComponent, {
      width: "40rem",
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.userService.getUser().subscribe({
          next: (user) => {
            this.onEdit.emit(user);
          }
        })
      }
    });
  }

  onEditEmail() {
    this.matDialog.open(ChangeEmailComponent, {
      width: "40rem",
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.userService.getUser().subscribe({
          next: (user) => {
            this.onEdit.emit(user);
          }
        })
      }
    });
  }

  @Output() onEdit = new EventEmitter<User>();
}
