import { Component } from '@angular/core';
import {AuthService} from "@data/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent {
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.authService.activateEmail(params).subscribe({
          next: () => {
            this.router.navigate(['/auth/login']).then(r => console.log(r));
          }
        });
      })
  }
}
