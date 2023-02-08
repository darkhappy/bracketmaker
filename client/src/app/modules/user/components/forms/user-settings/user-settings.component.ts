import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '@data/services/user.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  // @ts-ignore
  formSettings : FormGroup
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
   
  ngOnInit(): void {
    this.formSettings = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: [''],
      email: ['', Validators.required],
    });
  }
  onDeleteAccount() {
  }
  onSubmit() {
  }
}
