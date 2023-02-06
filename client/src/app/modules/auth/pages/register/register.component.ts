import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../data/services/user.service";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // @ts-ignore
  formRegister: FormGroup;
  matcher = new MyErrorStateMatcher();

  hide = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.formRegister = this.fb.group({
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
    if (this.formRegister?.valid) {
      this.userService.createUser(this.formRegister.value).subscribe( {
        next: () => {
         
        }, 
        error: (error) => {
          this.hide = true;
        }
      });
    }
  }

  googleLogin() {
  }

  facebookLogin() {
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
