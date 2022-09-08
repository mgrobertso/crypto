import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public userInfo$: BehaviorSubject<user|null> = new BehaviorSubject<user|null>(null);

  constructor(public http:HttpClient) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'false';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }

  getState() {
    return localStorage.getItem('loggedIn');
  }

  setState(d: boolean) {
    this.isLoggedIn$.next(d);
  }

  setUserState(d:user)
  {
    this.userInfo$.next(d)
  }


  logout() {
    this.isLoggedIn$.next(false);
    this.userInfo$.next(null);
    localStorage.clear();
  }
}