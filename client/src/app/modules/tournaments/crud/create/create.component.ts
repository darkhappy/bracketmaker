import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerModel} from "@data/schemas/Player.model";
import { TournamentService } from "@data/services/tournament.service";

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

  constructor(private fb: FormBuilder, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      bracket_type: ['', Validators.required],
      //visibility: ['', Validators.required],
      location: ['', Validators.required],
      game: ['', Validators.required],
      player: ['', Validators.required],
    });
  }
  onSubmit(){
  this.formCreate
    if (this.formCreate?.valid) {
      this.tournamentService.createTournament(this.formCreate.value).subscribe( {
        next: () => {
          alert('good');
        },
        error: (error) => {
          alert("bad");
        }
      });
    }else{
      console.log('erreur dan le form')
      console.log(this.formCreate.value)
    }
  }

  ajouter(): void {
    let player = new PlayerModel();
    player.name= this.name
    this.joueurs.push(player);
  }
}
