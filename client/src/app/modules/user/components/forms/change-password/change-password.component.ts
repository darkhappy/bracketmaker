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

  hide = false;
  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
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

    }
  }
}
