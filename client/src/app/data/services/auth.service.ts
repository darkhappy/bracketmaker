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

  createToken(user: any) {
    return this.http.post<any>('/api/token/', user);
  }

  getToken(token: string | null) {
    return this.http.get<any>(`/api/password/${token}`);
  }
  
  changePassword(username: string, user: any) {
    return this.http.put<any>(`/api/password/${username}`, user);
  }

  deleteToken(username: string) {
    return this.http.delete<any>(`/api/password/${username}`);
  }
}
