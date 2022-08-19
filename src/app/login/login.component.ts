import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  isLogged:boolean=false;
  loginData:any;

  onClickSubmit(data:any){
    console.log("username:" +data.name,"password:"+data.password);
    //implement validation and server side validation later.
    //routs homepage for now
  }

  constructor() { }

  ngOnInit(): void {

  }

}
