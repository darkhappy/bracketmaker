import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@data/services/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  // images d'arrière plan
  images = ["bg-hockey", "bg-chess", "bg-soccer", "bg-gaming", "bg-volley"];
  background: string = "bg-hockey";

  constructor(private router: Router, private authService: AuthService) {
  }

  // on choisit une image d'arrière plan au hasard
  ngOnInit(): void {
    const index = Math.floor(Math.random() * this.images.length);
    this.background = this.images[index];
  }

  // on vérifie si l'utilisateur est connecté
  userConnected(): Boolean {
    return this.authService.getUserId() !== null;
  }

  /*
  * on redirige l'utilisateur vers la page de connexion
  * si il n'est pas connecté
  * sinon on redirige vers la page de jeu
  * param: path: string
   */
  navigate(path: string) {
    this.router.navigate([path]);
  }
}
