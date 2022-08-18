import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, pipe } from 'rxjs';
import { user } from '../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formData: user={"first_name":' ',"last_name":'',"username":'',"password":'',"email":'','watch_list':[]};

  registerForm = new FormGroup({
    firstNameCtrl: new FormControl('',Validators.required),
    lastNameCtrl: new FormControl('',Validators.required),
    userNameCtrl: new FormControl('',Validators.required),
    emailCtrl: new FormControl('',Validators.required),
    passwordCtrl: new FormControl('',Validators.required)
  });

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  createUser()
  {
    this.formData.first_name = String(this.registerForm.controls.firstNameCtrl.value);
    this.formData.last_name = String(this.registerForm.controls.lastNameCtrl.value);
    this.formData.username = String(this.registerForm.controls.userNameCtrl.value);
    this.formData.email = String(this.registerForm.controls.emailCtrl.value);
    this.formData.password = String(this.registerForm.controls.passwordCtrl.value);
    console.log(this.formData);
    this.router.navigateByUrl("/crypto");
  }

  }
