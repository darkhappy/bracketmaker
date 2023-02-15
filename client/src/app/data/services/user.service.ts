import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@data/schemas/user';
import { HttpClient } from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser() : Observable<User> {
    return this.http.get<User>('/api/user');
  }

  getOneUser() : Observable<User> {
    let SESSION_INFO = this.cookieService.get('sessioninfo');
    let SESSION_INFO_JSON = JSON.parse(SESSION_INFO);
    console.log(SESSION_INFO_JSON.id)
    return this.http.get<User>('/api/user/' + SESSION_INFO_JSON.id);
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>('/api/user/update', user);
  }
  updateProfile(user: User) : Observable<User> {
    return this.http.put<User>('/api/user/profile', {
      displayName: user.display_name,
      about: user.about,
      showEmail: user.showEmail
    });
  }

  changePassword(data: any) : Observable<any> {
    return this.http.put<any>('/api/user/password', data);
  }

  getUsers() : Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }

}
