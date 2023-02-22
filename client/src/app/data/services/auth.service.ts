import { Injectable } from '@angular/core';
import { User } from '../schemas/user'; // { User
import { HttpClient } from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUsers() {
    return this.http.get<User[]>('/api/user');
  }

  getUserId(): string | null {
    let sessioninfo = this.cookieService.get('sessioninfo');
    console.log(sessioninfo);
    if (!sessioninfo)
      console.log("hey");
      return null;
    let sessioninfo_json = JSON.parse(sessioninfo);
    return sessioninfo_json.id;
  }

  login(user: User) {
    console.log(user)
    return this.http.post<any>('/api/user/login', user);
  }

  logout() : Observable<any> {
    return this.http.post<any>('/api/user/logout', {});
  }

  createUser(user: any) {
    return this.http.post<any>('/api/user/', user);
  }

  createToken(user: any) {
    return this.http.post<any>('/api/token/', user);
  }

  changeUsername(user: any) {
    return this.http.put<any>('/api/user/username', user);
  }

  changeEmail(user: any) {
    return this.http.put<any>('/api/user/email', user);
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

  googleLogin(user: any) {
    return this.http.post<any>(`/api/google`, user)
  }

  googleChangeUsername(id: string){
    return this.http.put(`/api/google/`, {id: id})
  }

}
