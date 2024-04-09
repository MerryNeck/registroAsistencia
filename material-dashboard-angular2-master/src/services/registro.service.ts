import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { Area } from "models/area.model";
import { Rol } from 'models/rol.model';
import { Usuario } from 'models/usuario.model';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

interface RegistroResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
}) export class RegistroService {
    private url = environment.backend.anticipo; 

    constructor(private _http: HttpClient, private authService:AuthService) { }

    getAreas(): Observable<Area[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Area[]>(this.url + '/area/', { headers });
    }

    getRoles(): Observable<Rol[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Rol[]>(this.url + '/rol/', { headers });
    }
    getHeaders() {
        const token = this.authService.getToken(); // Obtener el token JWT
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }

       // Método para obtener todos los anticipos
  obtenerUsuario(token:string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this._http.get<Usuario[]>(this.url,{ headers });
  }

    // Método para registrar un Usuario
  registrarUsuario(usuario: Usuario,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this._http.post<any>(`${this.url}/registrar`, usuario,{ headers});
  }

   

    getUsuario(idUsuario: any): Observable<any> {//verificar en el backen si necesita parametro
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "/usuario/" + idUsuario, { headers: headers });

    }

     // Método para actualizar un registro de usuario
     actualizarUsuario(usuario: Usuario, token: string): Observable<void> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this._http.put<void>(`${this.url}/actualizar/${usuario.id_usuario}`, usuario, { headers })
        .pipe(
          catchError(error => {
            console.error('Error al actualizar el anticipo:', error);
            return throwError('No se pudo actualizar el anticipo');
          })
        );
    }
    obtenerUsuarioPorId(id: number, token: string): Observable<Usuario> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this._http.get<Usuario>(`${this.url}/regisusuario/${id}`, { headers })
        .pipe(
          catchError(error => {
            console.error('Error al obtener el usuario:', error);
            return throwError('No se pudo obtener el usuario');
          })
        );
    }

 // Eliminar (desactivar y activar)
 cambiarEstadoUsuario(idUsuario: number, estado: string,token:string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this._http.patch(`${this.url}/cambiarEstado/${idUsuario}`, { estado }, { headers });
  }

  buscarPorCi(ci: string,token): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this._http.get<Usuario[]>(`${this.url}/buscar?ci=${ci}`,{headers});
  }
}