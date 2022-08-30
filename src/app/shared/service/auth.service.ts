import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { user } from '../user';


@Injectable({providedIn: 'root'})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  getUser() {
    this.http.get()
  }

}
