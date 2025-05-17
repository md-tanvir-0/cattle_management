import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthResponse, User } from '../shared/models/user.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

login(username: string, password: string): Observable<AuthResponse> {
    return this.http.get<User[]>(`${environment.apiUrl}/users?username=${username}`)
        .pipe(
        map(users => {
            const user = users[0];
            if (user && user.password === password) {
            const token = `mock-jwt-token-${Date.now()}`;
            localStorage.setItem(this.tokenKey, token);

            const currentUser = { id: user.id, username: user.username };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);

            return {
                accessToken: token,
                user: currentUser
            } as AuthResponse;
            } else {
            throw new Error('Invalid username or password');
            }
        }),
        catchError(error => {
            return throwError(() => new Error('Authentication failed'));
        })
    );
}

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}