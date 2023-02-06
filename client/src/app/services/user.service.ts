import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('/api/'); //Mettre la bonne route
  }

  login(user: any) {
    return this.http.post<any>('/api/user/login', user);
  }

  createUser(user: any) {
    return this.http.post<any>('/api/user/create', user);
  }
}
