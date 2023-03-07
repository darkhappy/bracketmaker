import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentModel } from '@data/schemas/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  testTournament: TournamentModel = {
    _id: '1',
    name: 'Awesome Tournament',
    description: "It's awesome",
    date: new Date(),
    game: 'CAI Simulator',
    bracket_type: 'Single Elimination',
    visibility: 'Public',
    location: 'Online',
    organizer_id: '1',
    players: [{ name: '1' }, { name: '2' }],
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

  constructor(private http: HttpClient) {}

  createTournament(tournament: TournamentModel) {
    return this.http.post<TournamentModel>('/api/tournament/', tournament);
  }

  getTournaments() {
    return this.http.get<TournamentModel[]>('/api/tournament/');
  }

  getTournamentsFrom(id: string) {
    return this.http.get<TournamentModel[]>('/api/tournament/from/' + id);
  }
  updateTournament(tournament: TournamentModel) {
    return this.http.put<TournamentModel>('/api/tournament/', tournament);
  }

  deleteTournament(id: String) {
    return this.http.delete<TournamentModel>(`/api/tournament/?_id=${id}`);
  }

  getTournament(id: string) {
    return this.http.get<TournamentModel>(`/api/tournament/?_id=${id}`);
  }

  followTournament(id: String): Observable<any> {
    return this.http.post(`/api/tournament/follow/` + id, {});
  }

  unfollowTournament(id: String) {
    return this.http.delete(`/api/tournament/follow/` + id, {});
  }

  getFollowedTournaments() {
    return this.http.get<any>('/api/tournament/followed');
  }

  searchFollowedTournaments(search: string) {
    console.log(search);
    if (search == '') {
      return this.http.get<any>('/api/tournament/followed');
    }
    return this.http.get<any>('/api/tournament/followed/search/' + search);
  }

  searchTournaments(search: string) {
    return this.http.get<any>('/api/tournament/search/' + search);
  }

  isFollowed(id: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/tournament/follow/` + id);
  }
}
