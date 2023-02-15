import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie";
import {UserService} from "@data/services/user.service";

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  // @ts-ignore
  cookieService=inject(CookieService);
  // @ts-ignore
  formUsername: FormGroup;
  // @ts-ignore
  googleToken : String;
  constructor(private fb: FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
    this.formUsername = this.fb.group({
      username: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.formUsername?.valid) {
      this.userService.getUser().subscribe((data: any) => {
        data.username = this.formUsername.value.username;
        this.userService.updateProfile(data).subscribe((data: any) => {
          })
        })
      }
    }
}
