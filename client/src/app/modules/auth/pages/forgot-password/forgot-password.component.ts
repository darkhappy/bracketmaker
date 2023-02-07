import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  // @ts-ignore
  formEmail: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.formEmail?.valid) {
      
    }
  }
}
