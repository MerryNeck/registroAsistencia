import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private tokens : any 

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = JSON.parse(localStorage.getItem('token')!);
    }
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }
  getIdentity():Observable<any>{
    let identity = localStorage.getItem('token');
    // console.log(identity);
     if(identity){
      this.tokens = identity;
     }else{
       this.tokens = null;
     }

     return this.tokens;
  }
}