import {Component, NgModule} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {UserService} from "@data/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // @ts-ignore
  formRegister: FormGroup;

  hide = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  validPassword(group: FormGroup): ValidationErrors | null {
    const password = group.controls['password']?.value;
    const confirm = group.controls['confirm']?.value;
    return password === confirm ? null : {mismatch: true};
  }

  onSubmit() {
    if (this.formRegister?.valid) {
      this.userService.createUser(this.formRegister.value).subscribe({
        next: () => {

        },
        error: (error) => {
          this.hide = true;
        }
      });
    } else {
      alert("There was an error registering the user. Please try again later.");
    }
  }

  googleLogin() {
  }

  facebookLogin() {
  }
}

