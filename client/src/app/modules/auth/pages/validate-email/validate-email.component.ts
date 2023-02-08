import { Component } from '@angular/core';
import { AuthService} from "@data/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        this.authService.activateEmail(params).subscribe({
          next: (res: any) => {
            console.log(res);
          }
        });
      })
  }
  onInit() {
    console.log('ok')

  }

}
