import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerModel} from "@data/schemas/Player.model";
import {TournamentService} from "@data/services/tournament.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  // @ts-ignore
  formCreate : FormGroup;
  players: PlayerModel[] = [];
  playerName: String = "";
  selectedRadio: String = "";
  organiser: String = "";

  constructor(private fb: FormBuilder, private tournamentService: TournamentService, private cookieService: CookieService) { }

  ngOnInit(): void {
    let SESSION_INFO = this.cookieService.get('sessioninfo');
    let SESSION_INFO_JSON = JSON.parse(SESSION_INFO);
    this.organiser = SESSION_INFO_JSON.id;

    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      bracket_type: ['', Validators.required],
      visibility: ['', Validators.required],
      location: ['', Validators.required],
      game: ['', Validators.required],
      organiserID: ['', Validators.required],
      players: [''],
    });
  }
  onSubmit(){
    this.formCreate.patchValue({visibility:this.selectedRadio, organiserID:this.organiser});
    if (this.formCreate?.valid) {
      this.formCreate.patchValue({players:this.players,});
      this.tournamentService.createTournament(this.formCreate.value).subscribe( {
        next: () => {
          alert('le tournoi a été créé');
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
