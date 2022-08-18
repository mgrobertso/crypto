import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged:boolean=false;

  login(userName:string, password:string){
    console.log(userName);
    console.log(password);

    this.isLogged =userName=='admin'&&password=='admin';
    localStorage.setItem('isLogged',this.isLogged?"true":"false");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
