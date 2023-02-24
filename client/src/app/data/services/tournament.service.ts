import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {TournamentModel} from "@data/schemas/tournament.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  createTournament(tournament: TournamentModel) {
    return this.http.post<TournamentModel>('/api/tournament/', tournament);
  }

  getTournament(id: string) {
    return this.http.get<TournamentModel>(`/api/tournament/?_id=${id}`);
  }

  followTournament(id: String) : Observable<any> {
    return this.http.post(`/api/tournament/follow`, {id: id});
  }

  unfollowTournament(id: String) {
    return this.http.post(`/api/tournament/unfollow`, {id: id});
  }

  getFollowedTournaments() {
    return this.http.get<any>('/api/tournament/followed');
  }

  searchTournaments(search: string) {
    return this.http.get<any>('/api/tournament/search/' + search);
  }
}
