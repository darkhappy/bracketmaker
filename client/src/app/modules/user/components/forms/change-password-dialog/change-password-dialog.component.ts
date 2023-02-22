import { Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '@data/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DialogData {
  oldPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {
  // @ts-ignore
  form: FormGroup;

  hide = true;
  match = true;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData, 
    private fb: FormBuilder, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    console.log(this.form.value);
    if (this.form.value.newPassword === this.form.value.confirm) {
      if (this.form.valid) {
        console.log(this.form.value);
        this.userService.changePassword(this.form.value).subscribe(
          (res) => {
            this.dialogRef.close();
          },
          (err) => {
            this.hide = false;
          }
        );
      }
    }
    else {
      this.match = false;
    }
  }

}
