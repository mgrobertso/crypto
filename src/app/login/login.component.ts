import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/service/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  sub!: Subscription;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    console.log('login built');
  }

  onClickSubmit(data: User) {
    this.sub = this.auth.login(data).subscribe((valid) => {
      if (valid) {
        this.router.navigate(['crypto']);
      }
    });
  }
}
