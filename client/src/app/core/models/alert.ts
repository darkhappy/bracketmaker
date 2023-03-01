export enum AlertType {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Hidden = "",
}

export interface Alert {
  type: AlertType;
  title?: string;
  message: string;
}
