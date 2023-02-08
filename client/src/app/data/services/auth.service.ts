import { Injectable } from '@angular/core';
import { User } from '../schemas/user'; // { User
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Params} from "@angular/router";


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

  activateEmail(query: any) {
    console.log(query.token)
    return this.http.get<any>('/api/user/activate?token=' + query.token);
  }
}
