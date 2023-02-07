import { Injectable } from '@angular/core';
import { User } from '../schemas/user'; // { User
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('/api/'); //Mettre la bonne route
  }

  login(user: any) {
    return this.http.post<any>('/api/user/', user);
  }

  createUser(user: any) {
    return this.http.post<any>('/api/user/', user);
  }
}
