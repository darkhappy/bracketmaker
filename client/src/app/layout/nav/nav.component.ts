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

  userId: string | null = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  userConnected(): Boolean {
    return this.authService.getUserId() !== null;
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.router.navigate(['/']).then(r => {
      this.authService.logout().subscribe();
    });
  }
}
