import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ChangeUsernameComponent } from "@modules/user/components/forms/change-username/change-username.component";
import { ChangeEmailComponent } from "@modules/user/components/forms/change-email/change-email-component";

@Component({
  selector: "app-settings-account",
  templateUrl: "./settings-account.component.html",
  styleUrls: ["./settings-account.component.scss"],
})
export class SettingsAccountComponent {
  constructor(private matDialog: MatDialog) {
  }

  onEditUsername() {
    this.matDialog.open(ChangeUsernameComponent, {
      width: "40rem",
    });
  }

  onEditEmail() {
    this.matDialog.open(ChangeEmailComponent, {
      width: "40rem",
    });
  }
}
