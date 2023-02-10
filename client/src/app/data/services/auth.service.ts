import { Injectable } from '@angular/core';
import { User } from '../schemas/user'; // { User
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('/api/user');
  }

  login(user: User) {
    console.log(user)
    return this.http.post<any>('/api/user/login', user);
  }

  createUser(user: any) {
    return this.http.post<any>('/api/user/', user);
  }

  createToken(user: any) {
    return this.http.post<any>('/api/token/', user);
  }

  changePassword(token: string, user: any) {
    return this.http.put<any>(`/api/password/${token}`, user);
  }

  tokenExist(token: string) {
    return this.http.get<any>(`/api/password/${token}`);
  }

  activateEmail(token: any) {
    return this.http.get<any>(`/api/user/activate/?token=${token.token}`);
  }

  googleLogin(credential: string) {
    return this.http.post<any>(`/api/google`, credential)
  }

  googleLogout(){
    // detruit le token
  }
}
