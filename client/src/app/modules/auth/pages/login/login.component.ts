import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@data/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // @ts-ignore
  formLogin: FormGroup;

  hide = false;
  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin?.valid) {
      this.userService.login(this.formLogin.value).subscribe( {
        next: () => {
          alert('good');
        },
        error: (error) => {
          //this.hide = true;
          alert('nope');
        }
      });
    }
  }
}
