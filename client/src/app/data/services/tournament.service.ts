import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {TournamentModel} from "@data/schemas/tournament.model";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  createTournament(tournament: TournamentModel) {
    return this.http.post<TournamentModel>('/api/tournament/', tournament);
  }

  updateTournament(tournament: TournamentModel) {
    return this.http.put<TournamentModel>('/api/tournament/', tournament);
  }

  deleteTournament(id: String) {
    return this.http.delete<TournamentModel>(`/api/tournament/${id}`);
  }
}
