import { Injectable } from '@angular/core';
import { JwtHelperService } from 'angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}