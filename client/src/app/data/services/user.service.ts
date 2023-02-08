import { Injectable } from "@angular/core";
import { User } from "@data/schemas/user";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  sampleUser: User = {
    id: 1,
    username: "darkhappy",
    password: "password",
    email: "me@darkh.app",
    avatar: "https://avatars.githubusercontent.com/u/57161803?v=4",
    about: "bashing my head because i'm trash at web development",
    display_name: "Jean-Philippe",
  };

  constructor() {
  }

  getUser(): Observable<User> {
    return of(this.sampleUser);
  }
}
