import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@data/services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  userConnected(): Boolean {
    return this.authService.getUserId() !== null;
  }

  ngOnInit() {
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
