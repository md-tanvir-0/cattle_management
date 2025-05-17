import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cattle } from '../shared/models/cattle.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CattleService {
  private apiUrl = `${environment.apiUrl}/cattle`;

  constructor(private http: HttpClient) {}

  getAllCattle(): Observable<Cattle[]> {
    return this.http.get<Cattle[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCattleById(id: number): Observable<Cattle> {
    return this.http.get<Cattle>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCattle(cattle: Cattle): Observable<Cattle> {
    return this.http.post<Cattle>(this.apiUrl, cattle)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCattleAvailability(id: number, isAvailable: boolean): Observable<Cattle> {
    return this.http.patch<Cattle>(`${this.apiUrl}/${id}`, { isAvailable })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}