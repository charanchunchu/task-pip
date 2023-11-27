import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/menu';
  private usersUrl = 'http://localhost:3000/users';
  private credentials: { [key: string]: string } = { admin: 'admin', customer: 'customer' };

  constructor(private _http: HttpClient) { }

  getMenuItems(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl);
  }

  addMenuItem(data: any): Observable<any> {
    const headers = new HttpHeaders();
    return this._http.post<any>(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }


  updateMenuItem(id: number, data: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteMenuItem(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }
  checkClientAuthentication(username: string, password: string): Observable<boolean> {
    return this._http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => response.authenticated),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  registerUser(username: string, password: string): Observable<any> {
    const data = { username, password, role: 'customer' };

    const headers = new HttpHeaders();
    return this._http.post<any>(this.usersUrl, data, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
