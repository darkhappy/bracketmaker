import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { TournamentModel } from "@data/schemas/tournament.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TournamentService {
  testTournament: TournamentModel = {
    _id: "1",
    name: "Awesome Tournament",
    description: "It's awesome",
    date: new Date(),
    game: "CAI Simulator",
    bracket_type: "Single Elimination",
    visibility: "Public",
    location: "Online",
    organizer_id: "1",
    players: [{ name: "1" }, { name: "2" }],
  };

  testTournaments: TournamentModel[] = [
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
    this.testTournament,
  ];

  constructor(private http: HttpClient) {
  }

  createTournament(tournament: TournamentModel) {
    return this.http.post<TournamentModel>("/api/tournament/", tournament);
  }

  getTournaments() {
    return this.http.get<TournamentModel[]>("/api/tournament/");
  }

  getTournamentsFrom(id: string) {
    return this.http.get<TournamentModel[]>("/api/tournament/from/" + id);
  }
}
