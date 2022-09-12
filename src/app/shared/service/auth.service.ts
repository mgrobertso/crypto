import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _userInfo: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  readonly userInfo$ = this._userInfo.asObservable();

  constructor(public http: HttpClient, private router: Router) {}

  setState(d: boolean): void {
    this._isLoggedIn.pipe(map((log) => d));
  }

  setUserState(d: User): void {
    this._userInfo.pipe(map((use) => d));
  }

  login(data: User) {
     this.http.get<User[]>('http://localhost:3000/users').pipe(
      map((users) => {
        const userData = users.flat();
        return userData.find((user: User) => {
          return (
            user.username == data.username && user.password == data.password
          );
        });
      }),
    );
  }

  logout(): void {
    this.setState(false);
    this._userInfo.next(null);
    localStorage.clear();
  }

  signUP(formData: User): Observable<boolean> {
    return this.http.post('http://localhost:3000/users', formData).pipe(
      map(
        (user) => {
          return true;
        },
        catchError((err) => {
          return throwError(() => new Error('User could not be created'));
        })
      )
    );
  }
}
