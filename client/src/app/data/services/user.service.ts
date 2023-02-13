import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@data/schemas/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser() : Observable<User> {
    return this.http.get<User>('/api/user');
  }

  updateProfile(user: User) : Observable<User> {
    return this.http.put<User>('/api/user/profile', {
      displayName: user.display_name,
      about: user.about,
      showEmail: user.showEmail
    });
  }

}
