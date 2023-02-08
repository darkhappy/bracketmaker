import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@data/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  // @ts-ignore
  formEmail: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService : AuthService) { }
  ngOnInit(): void {
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.formEmail?.valid) {
      this.authService.createToken(this.formEmail.value).subscribe({
        next: (response) => {
          if (window.confirm("Voici votre email. Cliquez sur ce lien pour changer votre mot de passe " + "localhost/auth/change-password?token=" + response)) {
            window.location.href = "/auth/change-password?token=" + response;
          }
        },
        error: (error) => {
          alert("Vous avez aucun nouveau email.");
        }
      });
    } 
  }
}
