import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@data/services/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  images = ["bg-hockey", "bg-chess", "bg-soccer", "bg-gaming", "bg-volley"];
  background: string = "bg-hockey";

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    const index = Math.floor(Math.random() * this.images.length);
    this.background = this.images[index];
  }

  userConnected(): Boolean {
    return this.authService.getUserId() !== null;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
