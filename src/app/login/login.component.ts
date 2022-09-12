import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from '../shared/service/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  subisLogged!: Subscription;
  errorMessage ='';

  constructor(private router: Router, private auth: AuthService) {
    this.subisLogged = this.auth.isLoggedIn$.subscribe(
    )
  }

  ngOnInit(): void {
    console.log('login built');
  }

  onClickSubmit(data: User) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
