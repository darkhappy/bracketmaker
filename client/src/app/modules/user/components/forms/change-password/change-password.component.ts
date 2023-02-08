import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "@data/services/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  // @ts-ignore
  formChangePassword: FormGroup;
  token: string | null = null;
  hide = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.token = urlParams.get('token');

    this.formChangePassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirm : ['', Validators.required]
    }, {
      validators: this.validPassword
    });
  }

  validPassword(group: FormGroup) {
    const password = group.controls['newPassword'].value;
    const confirm = group.controls['confirm'].value;
    return password === confirm ? null : { matching: true };
  }

  onSubmit() {
    if (this.formChangePassword?.valid) {
      this.authService.getToken(this.token).subscribe({
        next: (response) => {
          this.authService.changePassword(response, this.formChangePassword.value).subscribe({
            next: () => {
              alert("Password changed successfully!");
              this.authService.deleteToken(response).subscribe();
              this.router.navigate(['/auth/login']);
            },
            error: (error) => {
              alert("There was an error changing the password. Please try again later.");
            }
          });
        },
        error: (error) => {
          console.log("mauvais token");
        }
      });
    }
  }
}
