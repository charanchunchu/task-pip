// authenticate.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private _http: HttpClient) { }

  checkClientAuthentication(username: string, password: string): Observable<boolean> {
    return this._http.post<any>(this.apiUrl, { username, password }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  registerUser(username: string, password: string): Observable<any> {
    const data = { username, password, role: 'customer' };

    const headers = new HttpHeaders();
    return this._http.post<any>('http://localhost:3000/users', data, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
