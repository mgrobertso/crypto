import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../shared/crypto.service';
import { user } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output()
  isLogged = false;
  loginData:user={username:'',password:'',first_name:'',last_name:'',watch_list:[],email:''};
  sub!: Subscription;

  onClickSubmit(data: user) {
    console.log('username:' + data.username, 'password:' + data.password);
    if (
      data.username === this.loginData.username &&
      data.password === this.loginData.password
    ) {
      alert(String(data.first_name)+' has logged in');
    } else {
      alert('failed  to log in');
    }

    //implement validation and server side validation later.
    //routs homepage for now
  }

  constructor(private crypto: CryptoService) {}

  ngOnInit(): void {
    this.sub = this.crypto.getuser().subscribe((stream) => {
      this.loginData.email = stream[0].email;
      this.loginData.first_name = stream[0].first_name;
      this.loginData.last_name = stream[0].last_name;
      this.loginData.username = stream[0].username;
      this.loginData.password = stream[0].password;
      this.loginData.watch_list = stream[0].watch_list;

    });

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
