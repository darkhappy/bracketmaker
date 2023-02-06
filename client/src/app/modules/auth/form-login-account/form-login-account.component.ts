import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-login-account',
  templateUrl: './form-login-account.component.html',
  styleUrls: ['./form-login-account.component.scss']
})
export class FormLoginAccountComponent {
  // @ts-ignore
  createAccount: FormGroup;

  hide = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.createAccount = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirm : ['', Validators.required]
    }, {
      validators: this.validPassword
    });
  }

  validPassword(group: FormGroup) {
    const password = group.controls['password'].value;
    const confirm = group.controls['confirm'].value;
    return password === confirm ? null : { matching: true };
  }

  onSubmit() {
    if (this.createAccount?.valid) {
      this.userService.createUser(this.createAccount.value).subscribe( {
        next: () => {
         
        }, 
        error: (error) => {
          this.hide = true;
        }
      });
    }
  }
}
