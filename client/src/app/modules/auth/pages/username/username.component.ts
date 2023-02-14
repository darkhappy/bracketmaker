import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie";
import {AuthService} from "@data/services/auth.service";

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
  constructor(private fb: FormBuilder, private authService : AuthService) { }

  ngOnInit(): void {
    this.formUsername = this.fb.group({
      username: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.formUsername?.valid) {
      let SESSION_INFO = this.cookieService.get('sessioninfo');
      console.log(SESSION_INFO);
      if(SESSION_INFO !== undefined) {
        let SessionInfo: any = JSON.parse(SESSION_INFO);
        this.authService.googleChangeUsername(SessionInfo.id).subscribe((data: any) => {
          console.log(data);
          // todo: backend + redirect to home page
        })
      }
    }
  }

}
