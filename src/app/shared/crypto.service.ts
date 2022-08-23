import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Icrypto } from '../crypto-data-component/crypto-data-component-datasource';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { user } from './user';



@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private cryptoUrl ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
  private url = '/assets/cryptodata.json';
  constructor(private http: HttpClient) {}

 getCrypto(): Observable<Icrypto[]> {
    return this.http.get<Icrypto[]>(this.cryptoUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
    //implement later
  }

  getuser():Observable<user[]>
  {
    return this.http.get<user[]>(this.url).pipe(tap((data)=>console.log('All',JSON.stringify(data))), catchError(this.handleError))
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An Error has Occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is :${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
