import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@data/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  // @ts-ignore
  formUsername: FormGroup;
  // @ts-ignore
  googleToken : String;
  constructor(private fb: FormBuilder, private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    this.formUsername = this.fb.group({
      username: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.formUsername?.valid) {
      this.userService.getOneUser().subscribe((data: any) => {
        data.message.username = this.formUsername.value.username;
        console.log(data)
        this.userService.updateUser(data).subscribe( {
          error: (error) => {
            alert(error)
          }
          })
        this.router.navigate(['/'])
        })
      }
    }
}
