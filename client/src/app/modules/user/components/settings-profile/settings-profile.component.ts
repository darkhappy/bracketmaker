import { Component, importProvidersFrom } from '@angular/core';
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
  constructor(private userService : UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formProfile = this.fb.group({
      display_name: [''],
      about : [''],
      showEmail : [false],
    });
  }
  onSubmit() {
    this.userService.updateProfile(this.formProfile.value).subscribe({
      next: () => {
        alert("Profile updated successfully!");
      },
      error: (error) => {
        alert("There was an error updating the profile. Please try again later.");
      }
    });
    
  }

  cancel() {
    this.formProfile.reset();
  }
}
