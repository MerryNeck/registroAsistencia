import {  Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from "@angular/common/http";//
//import { GLOBAL } from './GLOBAL';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Login } from 'models/login.model';

interface LoginResponse {
    token: string;
  }

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url:string = environment.backend.login;
  constructor(private _http: HttpClient , private authService: AuthService) { }

  getHeaders() {
    const token = this.authService.getToken(); // Obtener el token JWT
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
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
 // Método para obtener todos los perfiles
 obtenerPerfil(): Observable<Login[]> {
  return this._http.get<Login[]>(this.url,{ headers: this.getHeaders() });
}

// Método para registrar un perfil
registrarPerfil(usuario: Login): Observable<any> {
  return this._http.post<any>(this.url, usuario,{ headers: this.getHeaders() });
}
// Método para actualizar un perfil
actualizarPerfil(perfil: Login): Observable<any> {
  const url = `${this.url}/${perfil.id}`;
  return this._http.put<any>(url, perfil,{ headers: this.getHeaders() });
}
cambiarEstadoPerfil(id: number, estado: string): Observable<any> {
  return this._http.patch(`${this.url}/cambiarEstado/${id}`, { estado }, { headers: this.getHeaders() });
}
buscarPorCi(ci: string): Observable<Login[]> {
  return this._http.get<Login[]>(`${this.url}/buscar?ci=${ci}`);
}
}