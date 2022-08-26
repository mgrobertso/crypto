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
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    watch_list: [],
  };

  registerForm!: FormGroup;

  get controlArray(): AbstractControl | null {
    return this.registerForm.get('controlArray');
  }

  constructor(private router: Router, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      controlArray: this._formBuilder.array([
        this._formBuilder.group({
          firstNameCtrl: ['', Validators.required],
          lastNameCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          emailCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          userNameCtrl: ['', Validators.required],
          passwordCtrl: ['', Validators.required],
        }),
      ]),
    });
  }

  onSubmit(data: user) {
    this.formData.first_name = data.first_name
    this.formData.last_name = data.last_name
    this.formData.username = data.username
    this.formData.email = data.email
    this.formData.password = data.password

    console.log(
      'User created:' + this.formData.first_name + ' ' + this.formData.last_name
    );
    this.router.navigateByUrl('/crypto');

    //implement server side validation and insert later, for routs back to home page
  }
}
