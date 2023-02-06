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
  loginAccount: FormGroup;

  hide = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.loginAccount = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginAccount?.valid) {
      this.userService.login(this.loginAccount.value).subscribe( {
        next: () => {
         
        }, 
        error: (error) => {
          this.hide = true;
        }
      });
    }
  }
}
