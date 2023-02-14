import { Injectable } from "@angular/core";
import { Tournament } from "@data/schemas/tournament";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TournamentService {
  testTournament: Tournament = {
    id: 1,
    name: "Awesome Tournament",
    description: "It's awesome",
    date: new Date(),
    owner: "darkhappy",
    participants: ["lighthappy", "darkhappy", "light", "dark"],
    game: "CAI Simulator",
    status: "In progress",
  };

  testTournaments: Tournament[] = [
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
  ];

  constructor() {
  }

  getTournaments() {
    return of(this.testTournaments);
  }
}
