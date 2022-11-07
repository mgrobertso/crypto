import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { LoginRequest, SignupRequest, User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _userInfo: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  readonly userInfo$ = this._userInfo.asObservable();

  constructor(public http: HttpClient, private jwthelp: JwtHelperService, private router:Router) {}

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    const load = { username: data.username, password: data.password };
    return this.http
      .post<User>('https://localhost:7037/api/Auth/login', load, { headers })
      .pipe(
        map(
          (user) => {
            this.setUserState(user);
            this._isLoggedIn.next(true);
            localStorage.setItem('jwt', user.token);
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
      tap((watch) => {
        watch?.watch_list.push(id);
      })
    );
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwthelp.isTokenExpired(token)) {
      return true;
    } else {
      localStorage.removeItem("jwt");
      return false;
    }
  };

  logout(): void {
    this.setState(false);
    this._userInfo.next(null);
    localStorage.removeItem('jwt');
    this.router.navigateByUrl("/");
  }

  /**
   * login function
   * @param formData  SignupRequest param for signup
   * @returns Observable<User>
   */
  signup(formData: SignupRequest): Observable<User> {
    const payload = {
      firstName: formData.First_Name,
      lastName: formData.Last_Name,
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };
    return this.http
      .post<User>('https://localhost:7037/api/Auth/register', payload)
      .pipe(
        catchError((err) => {
          // catch error handling
          throw err;
        })
      );
  }
}
