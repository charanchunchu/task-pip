import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000/menu';

  constructor(private _http: HttpClient) {}

  getMenuItems(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  addMenuItem(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('Data being sent to server:', data);
    return this._http.post(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding menu item:', error);
        return throwError(error);
      })
    );
  }

  updateMenuItem(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteMenuItem(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
