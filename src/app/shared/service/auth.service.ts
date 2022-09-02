import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public watchList$!: BehaviorSubject<string[]>;

  constructor() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'false';

    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }

  getState() {
    return localStorage.getItem('loggedIn');
  }

  setState(d: boolean) {
    this.isLoggedIn$.next(d);
  }

  logout() {
    this.isLoggedIn$.next(false);
    localStorage.clear();
  }
}
