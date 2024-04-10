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
login(email:string, password:string,token:string){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    const body = { email, password }; 
    return this._http.post<any>(this.url, { email, password },{headers})
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
 obtenerPerfil(token:string): Observable<Login[]> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this._http.get<Login[]>(this.url,{ headers});
}

// Método para registrar un perfil
registrarPerfil(usuario: Login,token:string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this._http.post<any>(this.url, usuario,{ headers});
}

cambiarEstadoPerfil(id: number, estado: string,token:string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this._http.patch(`${this.url}/cambiarEstado/${id}`, { estado }, { headers});
}
buscarPorCi(ci: string,token:string): Observable<Login[]> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this._http.get<Login[]>(`${this.url}/buscar?ci=${ci}`,{headers});
}
// Método para actualizar un anticipo
actualizarPerfil(perfil: Login, token: string): Observable<void> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this._http.put<void>(`${this.url}/actualizar/${perfil.id_usuario}`, perfil, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        return throwError('No se pudo actualizar el usuario');
      })
    );
}
obtenerPerfilPorId(id: number, token: string): Observable<Login> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this._http.get<Login>(`${this.url}/editar/${id}`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        return throwError('No se pudo obtener el usuario');
      })
    );
}

}