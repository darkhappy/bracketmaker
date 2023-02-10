import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@data/services/auth.service";
import {Router} from "@angular/router";
import {faDiscord, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // @ts-ignore
  formLogin: FormGroup;
  discord = faDiscord;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  hide = false;
  constructor(private fb: FormBuilder,
              private userService: AuthService,
              private router: Router,
              private socialAuthService: SocialAuthService,
  ) { }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(async (user) => {
      await this.userService.googleLogin(user).subscribe({
        next: res => {
          //put token into cookie
            console.log(res)
          //redirect to home
        }
      });
    });
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin?.valid) {
      this.userService.login(this.formLogin.value).subscribe( {
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert("nom d'utilisateur ou mot de passe incorrect");
        }
      });
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  /*async handleCredentialResponse(response: CredentialResponse) {
    await this.userService.googleLogin(response.credential).subscribe( {
      next: res => {
        //put token into cookie

        //redirect to home
      }
    });
  }*/

  googleLogin() {
  }

  discordLogin() {
  }
}
