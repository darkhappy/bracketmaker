import { Component, Input } from "@angular/core";
import { AuthService } from "@data/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent {
  formChangeUsername!: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dialogRef: MatDialogRef<ChangeUsernameComponent>) { }

 // Initialization du composant
  ngOnInit(): void {
    this.formChangeUsername = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Fermeture de la fenêtre
  onClose() {
    this.dialogRef.close(false);
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.formChangeUsername.invalid) {
      return;
    }
    // Appel du service d'authentification
    this.authService.changeUsername(this.formChangeUsername.value).subscribe({
      next: () => {
        alert("Username changed successfully!");
        this.dialogRef.close(true);
      },
      error: (error) => {
        alert("There was an error changing the password. Please try again later.");
      }
    });

  }
}
