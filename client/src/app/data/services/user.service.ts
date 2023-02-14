import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@data/schemas/user';
import { HttpClient } from '@angular/common/http';

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


  constructor(private http: HttpClient) { }

  getUser() : Observable<User> {
    return this.http.get<User>('/api/user');
  }

  updateProfile(user: User) : Observable<User> {
    console.log(user);
    return this.http.put<User>('/api/user/profile', {
      displayName: user.display_name,
      about: user.about,
      showEmail: user.showEmail
    });
  }

  changePassword(data: any) : Observable<any> {
    return this.http.put<any>('/api/user/password', data);
  }
}
