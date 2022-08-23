import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { CryptoService } from '../shared/crypto.service';
import { user} from '../shared/user'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  @Output()
  isLogged:boolean=false;
  loginData:user[]=[];
  sub!:Subscription;

  onClickSubmit(data:user){
    console.log("username:" +data.password,"password:"+data.password);
    if(data.username===this.loginData[0].username && data.password===this.loginData[0].password)
    {
      alert('user has logged in')
    }
    else{
      alert('failed  to log in')
    }

    //implement validation and server side validation later.
    //routs homepage for now
  }

  constructor(private crypto:CryptoService) { }

  ngOnInit(): void {
    this.sub= this.crypto.getuser().subscribe((stream)=>{
      this.loginData[0].username = stream[0].username;
      this.loginData[0].password = stream[0].password;
    });

  }
  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

}
