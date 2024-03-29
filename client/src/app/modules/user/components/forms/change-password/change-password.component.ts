import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "@data/services/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { SettingsSecurityComponent } from '../../profile/settings/settings-security/settings-security.component';

export interface DialogData {
  oldPassword: string;
  newPassword: string;
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  // @ts-ignore
  formChangePassword: FormGroup;
  token: string = '';
  hide = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  // Initialisation du composant
  ngOnInit(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.token = urlParams.get('token') || '';

    // Si le token n'existe pas, on redirige vers la page de login
    this.authService.tokenExist(this.token).subscribe({
      error: () => {
        this.router.navigate(['/auth/login']);
      }
    });

    // Création du formulaire
    this.formChangePassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirm : ['', Validators.required]
    }, {
      validators: this.validPassword
    });
  }

  // Validation du formulaire
  validPassword(group: FormGroup) {
    const password = group.controls['newPassword'].value;
    const confirm = group.controls['confirm'].value;
    return password === confirm ? null : { matching: true };
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.formChangePassword?.valid) {
      // Changement du mot de passe
      this.authService.changePassword(this.token, this.formChangePassword.value).subscribe({
        next: () => {
          alert("Password changed successfully!");
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          alert("There was an error changing the password. Please try again later.");
        }
      });
    }
  }
}
