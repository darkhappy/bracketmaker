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
          alert("Email sent successfully!");
          this.router.navigate(['/user/change-password/'], {state:  {email: response.email }});
        },
        error: (error) => {
          alert("There was an error sending the email. Please try again later.");
        }
      });
    } else {
      alert("There was an error sending the email. Please try again later.");
    }
  }
}
