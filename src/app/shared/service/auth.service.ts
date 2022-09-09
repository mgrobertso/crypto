import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  pipe,
  Subscription,
} from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public userInfo$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  sub!: Subscription;
  regSub!: Subscription;

  constructor(public http: HttpClient, private router: Router) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'false';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }

  getState(): boolean {
    return Boolean(localStorage.getItem('loggedIn'));
  }

  setState(d: boolean): void {
    this.isLoggedIn$.next(d);
  }

  setUserState(d: User): void {
    this.userInfo$.next(d);
  }

  login(data: User): Observable<boolean> {
    this.sub = this.http
      .get<User[]>('http://localhost:3000/users')
      .pipe(
        map((users) => {
          const userData = users.flat();
          return userData.find((user: User) => {
            return (
              user.username == data.username && user.password == data.password
            );
          });
        }),
        catchError(() => {
          alert('error has occurred');
          return [];
        })
      )
      .subscribe((user?: User) => {
        if (user) {
          alert('login was success');
          this.setState(true);
          this.userInfo$.next(user);
          this.isLoggedIn$.next(true);
          localStorage.setItem('isLogged', 'true');
        } else {
          this.isLoggedIn$.next(false);
          localStorage.setItem('isLogged', 'false');
          this.setState(false);
          alert('user not found');
        }
      });
    return this.isLoggedIn$;
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.userInfo$.next(null);
    localStorage.clear();
  }

  signUP(formData: User): boolean {
    let userMade = false;
    (this.regSub = this.http
      .post('http://localhost:3000/users', formData)
      .subscribe((user) => {
        userMade = true;
      })),
      pipe(
        catchError((err) => {
          userMade = false;
          return err;
        })
      );
    return userMade;
  }
}
