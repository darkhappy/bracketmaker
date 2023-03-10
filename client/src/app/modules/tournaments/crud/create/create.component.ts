import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerModel} from "@data/schemas/Player.model";
import {TournamentService} from "@data/services/tournament.service";
import {Router} from "@angular/router";

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

  constructor(private router: Router,private fb: FormBuilder, private tournamentService: TournamentService,) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
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
    this.formCreate.patchValue({visibility:this.selectedRadio});
    if (this.formCreate?.valid) {
      this.formCreate.patchValue({players:this.players,});
      this.tournamentService.createTournament(this.formCreate.value).subscribe( {
        next: () => {
          this.router.navigate(['/tournament/list']);
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
