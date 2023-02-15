import { Component, EventEmitter, importProvidersFrom, Output } from '@angular/core';
import { UserService } from '@data/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss']
})
export class SettingsProfileComponent {
  // @ts-ignore
  formProfile : FormGroup
  user : any = {
    username: '',
    email: '',
    display_name: '',
    about: '',
    showEmail: false,
    avatar: ''
  }
  @Output() event = new EventEmitter<any>();

  constructor(private userService : UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = {
          display_name: user.display_name,
          about: user.about,
          showEmail: user.showEmail,
        };
      },
      error: (error) => {
        alert("There was an error loading the profile. Please try again later.");
      }
    });
    this.formProfile = this.fb.group({
      display_name: [''],
      about: [''],
      showEmail: [''],
    });
  }
  onSubmit() {
    this.userService.updateProfile(this.formProfile.value).subscribe({
      next: () => {
        this.userService.getUser().subscribe({
          next: (user) => {
            console.log(user);
            if (user.showEmail) {
              this.user = {
                username: user.username,
                email: user.email,
                display_name: user.display_name,
                about: user.about,
                showEmail: user.showEmail,
                avatar: user.avatar,
              };
            } else {
              this.user = {
                username: user.username,
                email : '',
                display_name: user.display_name,
                about: user.about,
                showEmail: user.showEmail,
                avatar: user.avatar,
              };
            }
            this.event.emit(this.user);
          },
          error: (error) => {
            alert("There was an error loading the profile. Please try again later.");
          }
        });
        
      },
      error: (error) => {
        alert("There was an error updating the profile. Please try again later.");
      }
    });
    
  }
  cancel() {
    this.formProfile = this.fb.group({
      display_name: [''],
      about: [''],
      showEmail: [''],
    });
  }
}
