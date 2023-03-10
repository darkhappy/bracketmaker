import { Component, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  // @ts-ignore
  formSettings : FormGroup
  constructor(private fb: FormBuilder, private router: Router) { }
  @Output() event = new EventEmitter<any>();

  // initialisation du composant
  ngOnInit(): void {
    this.formSettings = this.fb.group({
      username: [''],
      email: ['', Validators.required],
    });
  }
  onDeleteAccount() {
  }
  onSubmit() {
  }

  // mise à jour du profil
  updateProfile(user: any) {
    this.event.emit(user);
  }
}
