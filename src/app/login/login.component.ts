import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { user } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output()
  isLogged = false;
  loginData: user = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    watch_list: [],
    email: '',
  };
  sub!: Subscription;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    console.log('login built');
  }

  onClickSubmit(data: user) {
    this.sub = this.http.get<any[]>('http://localhost:3000/posts').subscribe(
      (res) => {
        const userData = res.flat();

        const valid = userData.find((a) => {
          return (
            a.userNameCtrl == data.username && a.passwordCtrl == data.password
          );
        });

        if (valid) {
          alert('login Success');
          this.isLogged = true;
          this.router.navigate(['crypto']);
        } else {

          alert('user not found');
        }
      },
      (err) => {
        alert('Error has occurred');
      }
    );
    //implement validation and server side validation later.
    //routs homepage for now
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
