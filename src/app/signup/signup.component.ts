import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../shared/service/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formData: User = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    watch_list: [],
  };

  registerForm!: FormGroup;
  nameForm!: FormGroup;
  emailForm!: FormGroup;
  userNPassForm!: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.nameForm = _formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
    });
    this.emailForm = _formBuilder.group({
      emailCtrl: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.email,
        ],
      ],
    });
    this.userNPassForm = _formBuilder.group({
      userNameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('form built');
  }
  getUserForm(): User {
    this.formData.first_name = this.nameForm.get('firstNameCtrl')?.value;
    this.formData.last_name = this.nameForm.get('lastNameCtrl')?.value;
    this.formData.username = this.userNPassForm.get('userNameCtrl')?.value;
    this.formData.password = this.userNPassForm.get('passwordCtrl')?.value;
    this.formData.email = this.emailForm.get('emailCtrl')?.value;
    console.log(this.formData);
    return this.formData;
  }

  signUP() {
    let userData = this.getUserForm();
    console.log(userData);
    if (
      this.nameForm.valid &&
      this.emailForm.valid &&
      this.userNPassForm.valid
    ) {
      this.auth.signUP(userData);
      this.router.navigate(['login']);
    } else {
      alert('form data is invalid');
      //will do better validation later
    }
    //implement server side validation and insert later, for routs back to home page
  }
}
