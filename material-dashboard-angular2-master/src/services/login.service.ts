import {  Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";//
//import { GLOBAL } from './GLOBAL';
import { environment } from '../environments/environment';

interface LoginResponse {
    token: string;
  }

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url:string = environment.backend.login;
  constructor(private _http: HttpClient) { }

login(email:string, password:string): Observable<LoginResponse>{
    const body = { email, password }; 
    return this._http.post<LoginResponse>(this.url, body)
    .pipe(
        catchError(this.handleError) 
      );
}
private handleError(error: any):Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      
      errorMessage = `Backend returned code ${error.status}: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); 
  }
}