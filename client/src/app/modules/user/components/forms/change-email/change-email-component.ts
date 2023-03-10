import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@data/services/auth.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email-component.scss']
})
export class ChangeEmailComponent {
  formChangeEmail!: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dialogRef: MatDialogRef<ChangeEmailComponent>) { }


  // Initialisation du composant ChangeEmailComponent
  ngOnInit(): void {
    this.formChangeEmail = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Fermeture de la fenêtre de dialogue
  onClose() {
    this.dialogRef.close(false);
  }

  // Soumission du formulaire
  onSubmit() {
    // Vérification de la validité du formulaire
    if (this.formChangeEmail.invalid) {
      return;
    }
    // Appel de la méthode changeEmail() du service AuthService
    this.authService.changeEmail(this.formChangeEmail.value).subscribe({
      next: () => {
        alert("Email changed successfully!");
        this.dialogRef.close(true);
      },
      error: (error) => {
        alert("There was an error changing the email. Please try again later.");
      }
    });

  }
}
