import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  // @ts-ignore
  formCreate : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      bracket_type: ['', Validators.required],
      visibility: ['', Validators.required],
      location: ['', Validators.required],
      game: ['', Validators.required],
      player: ['', Validators.required],
    });
  }
  onSubmit(){

  }
}
