import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@data/schemas/user';
import { HttpClient } from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  sampleUser: User = {
    username: "darkhappy",
    email: "me@darkh.app",
    display_name: "DarkHappy",
    about: "bashing my head because i'm trash at web development",
    showEmail: true,
    avatar: "https://avatars.githubusercontent.com/u/57161803?v=4",
    subscriptions: ["darkhappy"],
    tournaments: ["darkhappy"]
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser() : Observable<User> {
    return this.http.get<User>('/api/user');
  }

  getOneUser() : Observable<User> {
    let SESSION_INFO = this.cookieService.get('sessioninfo');
    let SESSION_INFO_JSON = JSON.parse(SESSION_INFO);
    return this.http.get<User>('/api/getUser/' + SESSION_INFO_JSON.id);
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

  getUserAvatar(userId: string) {
    return this.http.get<any>('/api/user/avatar/' + userId);
  }

  getUsers() : Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }

  searchUsers(search: string) : Observable<any[]> {
    if (search == '') {
      return this.getUsers();
    }
    return this.http.get<any[]>('/api/users/search/' + search);
  }

  getProfile(username: string) : Observable<any> {
    return this.http.get<any>('/api/user/getProfile/' + username);
  }

  getUserById(id: String) : Observable<any> {
    return this.http.get<any>('/api/user/getUserById/?_id=' + id);
  }

  followUser(username: String) : Observable<any> {
    return this.http.post<any>('/api/user/follow/' + username, {});
  }

  unfollowUser(username: String) : Observable<any> {
    return this.http.delete<any>('/api/user/follow/' + username);
  }

  isFollowed(username: String) : Observable<boolean> {
    console.log(username);
    return this.http.get<boolean>('/api/user/follow/' + username);
  }

  isLoggedProfile(username: String) : Observable<boolean> {
    return this.http.get<boolean>('/api/user/isLoggedProfile/' + username);
  }

}
