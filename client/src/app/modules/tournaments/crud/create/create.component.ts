import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerModel} from "@data/schemas/Player.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  // @ts-ignore
  formCreate : FormGroup;
  joueurs: PlayerModel[] = [];
  name: String = "";

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
      player: this.joueurs,
    });
  }
  onSubmit(){

  }

  ajouter(): void {
    let player = new PlayerModel();
    player.name= this.name
    this.joueurs.push(player);
  }
}
