import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[LoginComponent]
})
export class MenuComponent implements OnInit{
  isLogged:boolean = false;
  constructor(private log: LoginComponent) {}

  ngOnInit(): void{
    this.isLogged = this.log.isLogged;

  }

}
