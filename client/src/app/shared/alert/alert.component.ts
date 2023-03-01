import { Component } from "@angular/core";
import { Alert, AlertType } from "@app/models/alert";
import { AlertService } from "@app/services/alert.service";
import { NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent {
  alert: Alert = { type: AlertType.Hidden, message: "" };
  alertSubscription!: Subscription;
  routerSubscription!: Subscription;

  constructor(private alertService: AlertService, private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.alertService.getAlert().subscribe((alert) => {
      this.alert = alert;
    });

    this.alertSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.alertService.clearAlert();
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  cssClass() {
    let classes = "alert";

    switch (this.alert.type) {
      case AlertType.Error:
        classes += " alert-danger";
        break;
      case AlertType.Warning:
        classes += " alert-warning";
        break;
      case AlertType.Success:
        classes += " alert-success";
        break;
      case AlertType.Info:
        classes += " alert-info";
        break;
      case AlertType.Hidden:
        classes += " hidden";
        break;
    }

    return classes;
  }
}
