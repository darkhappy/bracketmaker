import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TournamentService} from "@data/services/tournament.service";
import {PlayerModel} from "@data/schemas/Player.model";

@Component({
  selector: 'app-update-tournament',
  templateUrl: './update-tournament.component.html',
  styleUrls: ['./update-tournament.component.scss']
})
export class UpdateTournamentComponent {
  // @ts-ignore
  formUpdate : FormGroup;
  players: PlayerModel[] = [];
  playerName: String = "";
  selectedRadio: String = "";

  constructor(private fb: FormBuilder, private tournamentService: TournamentService,) {}

  ngOnInit(){
    this.formUpdate = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      bracket_type: ['', Validators.required],
      visibility: ['', Validators.required],
      location: ['', Validators.required],
      game: ['', Validators.required],
      players: [''],
    });
  }

  onSubmit(){
    this.formUpdate.patchValue({visibility:this.selectedRadio});
    if (this.formUpdate?.valid) {
      this.formUpdate.patchValue({players:this.players,});
      this.tournamentService.updateTournament(this.formUpdate.value).subscribe( {
        next: () => {
          alert('le tournoi a été modifié');
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  ajouter(): void {
    let player = new PlayerModel();
    player.name= this.playerName;
    this.playerName = '';
    this.players.push(player);
  }

  setType(type : String){
    this.selectedRadio = type;
  }
}
