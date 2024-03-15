import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//
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
  constructor(
    private _http: HttpClient,
    
  ) { }

login(email:string, password:string): Observable<LoginResponse>{
    const url = this.url+'/login'; 
    const body = { email, password }; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<LoginResponse>(url, body, { headers })
    .pipe(
        catchError(this.handleError) 
      );
}
private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      
      errorMessage = `Backend returned code ${error.status}: ${error.body.error}`;
    }
    return throwError(errorMessage); 
  }
}