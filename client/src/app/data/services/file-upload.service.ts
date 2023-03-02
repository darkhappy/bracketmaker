import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }
  uploadAvatar(file: FormData):Observable<any> {
    return this.http.post<any>('/api/user/avatar', file);
  }
}
