import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@data/services/auth.service";
import {User} from "@data/schemas/user";
import {UserService} from "@data/services/user.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() user: any = {
    username: '',
    avatar: '',
  }

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  userConnected(): Boolean {
    return this.authService.getUserId() !== null;
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: user => {
        this.user = {
          username: user.username,
          avatar: user.avatar,
        };
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.router.navigate(['/']).then(r => {
      console.log('logout');
      this.authService.logout().subscribe();
    });
  }
}
