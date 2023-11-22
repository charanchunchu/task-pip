import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/menu';

  constructor(private _http: HttpClient) { }

  getMenuItems(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl);
  }

  addMenuItem(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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
}
