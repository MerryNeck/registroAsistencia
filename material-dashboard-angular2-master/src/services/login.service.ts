import {  Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from "@angular/common/http";//
//import { GLOBAL } from './GLOBAL';
import { environment } from '../environments/environment';
import { Login } from 'models/login.model';

interface LoginResponse {
    token: string;
  }

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url:string = environment.backend.api +'/api/user/';
  constructor(private _http: HttpClient ) { }

  
login(email:string, password:string){
  
    const body = { email, password }; 
    return this._http.post<any>(this.url+'/login', { email, password })
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
 obtenerPerfil(token:string, rutarol:string): Observable<Login[]> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
    'x-rol': `${rutarol}`
  });
  return this._http.get<Login[]>(this.url,{ headers});
}

// Método para registrar un perfil
registrarPerfil(usuario: Login,token:string, rutarol:string): Observable<any> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
    'x-rol': `${rutarol}`
  });
  return this._http.post<any>(this.url, usuario,{ headers});
}

cambiarEstadoPerfil(id: number, estado: string,token:string,rutarol:string): Observable<any> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
    'x-rol': `${rutarol}`
  });
  return this._http.delete(`${this.url}${id}`, { headers});
}
buscarPorCi(ci: string,token:string, rutarol:string): Observable<Login[]> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
    'x-rol': `${rutarol}`
  });
  return this._http.get<Login[]>(`${this.url}/buscar/${ci}`,{headers});
}
// Método para actualizar un anticipo
actualizarPerfil(perfil: Login, token: string, rutarol:string): Observable<void> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
    'x-rol': `${rutarol}`
  });
  return this._http.put<void>(`${this.url}/${perfil.id_usuario}`, perfil, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        return throwError('No se pudo actualizar el usuario');
      })
    );
}
obtenerPerfilPorId(id: number, token: string, rutarol:string): Observable<Login> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
    'x-rol': `${rutarol}`
  });
  return this._http.get<Login>(`${this.url}${id}`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        return throwError('No se pudo obtener el usuario');
      })
    );
}

}