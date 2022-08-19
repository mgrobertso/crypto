import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formData: user = {
    first_name: 'Enter First N',
    last_name: '',
    username: '',
    email: '',
    password: '',
    watch_list: [],
  };

  registerForm!:FormGroup;

  get controlArray(): AbstractControl | null { return this.registerForm.get('controlArray'); }

  constructor(private router: Router, private _formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      controlArray: this._formBuilder.array([
        this._formBuilder.group({
          firstNameCtrl:['',Validators.required],
          lastNameCtrl:['',Validators.required]
        }),this._formBuilder.group({
          emailCtrl:['',Validators.required]
        }),
        this._formBuilder.group({
          userNameCtrl:['',Validators.required],
          passwordCtrl:['',Validators.required]
        })
      ])
    });
  }

  onSubmit(data:any) {
    this.formData.first_name = data[0].firstNameCtrl
    this.formData.last_name = data[0].lastNameCtrl;
    this.formData.username = data[2].userNameCtrl;
    this.formData.email = data[1].emailCtrl;
    this.formData.password = data[2].passwordCtrl;

    console.log("User created:" + this.formData.first_name +" "+this.formData.last_name );
    this.router.navigateByUrl('/crypto');

    //implement server side validation and insert later, for routs back to home page
  }
}
