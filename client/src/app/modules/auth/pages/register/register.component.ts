import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@data/services/auth.service";
import {Router} from "@angular/router";
import {faDiscord, faGoogle} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // @ts-ignore
  formRegister: FormGroup;
  google = faGoogle;
  discord = faDiscord;
  hide = false;
  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formRegister?.valid) {
      this.userService.createUser(this.formRegister.value).subscribe({
        next: res => {
          alert(res.message);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          if(error.status === 409){
            alert(error.error.message);
          } else if(error.status === 500){
            alert("Internal server error");
          }
        }
      });
    } else {
      alert("There was an error registering the user. Please try again later.");
    }
  }

  googleRegister() {
  }

  discordRegister() {
  }
}

