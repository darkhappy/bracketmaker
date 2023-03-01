import { Injectable } from "@angular/core";
import { Alert, AlertType } from "@app/models/alert";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private subject = new Subject<Alert>();

  constructor() {}

  alert(alert: Alert): void {
    this.subject.next(alert);
  }

  warn(message: string, title?: string): void {
    this.alert({ type: AlertType.Warning, message: message, title: title });
  }

  error(message: string, title?: string): void {
    this.alert({ type: AlertType.Error, message: message, title: title });
  }

  success(message: string, title?: string): void {
    this.alert({ type: AlertType.Success, message: message, title: title });
  }

  info(message: string, title?: string): void {
    this.alert({ type: AlertType.Info, message: message, title: title });
  }

  clearAlert(): void {
    this.subject.next({ type: AlertType.Hidden, message: "" });
  }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }
}
