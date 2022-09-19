import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { LoginRequest, SignupRequest, User } from '../user';

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
    this._isLoggedIn.next(d);
  }

  setUserState(d: User): void {
    this._userInfo.next(d);
  }

  /**
   * login function
   * @param data - LoginRequest param for login
   * @returns Observable<User>
   */
  login(data: LoginRequest): Observable<User> {
    return this.http.post<User>('http://localhost:3000/login', data).pipe(
      map(
        (user) => {
          this.setUserState(user);
          this._isLoggedIn.next(true);
          return user;
        },
        catchError((err) => {
          // catch error handling
          throw err;
        })
      )
    );
  }

  addWatch(id: string): void {
    this._userInfo.pipe(
      map((watch) => {
        watch?.watch_list.push(id);
        console.log(watch?.watch_list);
      })
    );
  }

  logout(): void {
    this.setState(false);
    this._userInfo.next(null);
    localStorage.clear();
  }

  /**
   * login function
   * @param formData - SignupRequest param for signup
   * @returns Observable<User>
   */
  signup(formData: SignupRequest): Observable<User> {
    return this.http.post<User>('http://localhost:3000/signup', formData).pipe(
      map((user) => {
        return user;
      }),
      catchError((err) => {
        // catch error handling
        throw err;
      })
    );
  }
}
