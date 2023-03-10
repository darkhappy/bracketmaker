import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TournamentService} from "@data/services/tournament.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerModel} from "@data/schemas/Player.model";
import {TournamentModel} from "@data/schemas/tournament.model";

@Component({
  selector: 'app-update-tournament',
  templateUrl: './update-tournament.component.html',
  styleUrls: ['./update-tournament.component.scss']
})
export class UpdateTournamentComponent {
  // @ts-ignore
  formUpdate : FormGroup;
  //@ts-ignore
  details : string = "";
  players: PlayerModel[] = [];
  playerName: String = "";
  selectedRadio: String = "";
  //@ts-ignore
  tournament: TournamentModel = new TournamentModel();

  constructor(private router: Router,private fb: FormBuilder, private tournamentService: TournamentService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.details = this.route.snapshot.paramMap.get("details")!;
    this.tournamentService.getTournament(this.details).subscribe({
      next: res => {
        //@ts-ignore
        this.tournament = res.tournament
        this.players = this.tournament.players
      },
      error: (error) => {
        if(error.status === 404){
          alert(error.error.message);
        } else if(error.status === 500){
          alert("Internal server error");
        }
      }
    });

    this.formUpdate = this.fb.group({
      _id: [''],
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
    this.formUpdate.patchValue({visibility:this.selectedRadio, _id:this.details});
    if (this.formUpdate?.valid) {
      this.formUpdate.patchValue({players:this.players,});
      this.tournamentService.updateTournament(this.formUpdate.value).subscribe( {
        next: () => {
          this.router.navigate(['/tournament/profile/', this.details]);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  onDelete(){
    if(confirm("voulez vous vraiment supprimer le tournoi ?")) {
      this.tournamentService.deleteTournament(this.details).subscribe({
        next : () =>{
          this.router.navigate(['/tournament/profile/']);
        },
        error: (error: any) => {
          console.log(error);
        },
      })
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
