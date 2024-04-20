import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { Area } from "models/area.model";
import { Rol } from 'models/rol.model';
import { Usuario } from 'models/usuario.model';
import { environment } from 'environments/environment';

interface RegistroResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
}) export class RegistroService {
    private url = environment.backend.api+'/api/usuarios'; 

    constructor(private _http: HttpClient) { }

    getAreas(token:string,rutarol:string): Observable<Area[]> {
      const headers = new HttpHeaders({
        'x-token': `${token}`,
      'x-rol': `${rutarol}`
      });
        return this._http.get<Area[]>(this.url + '/area', { headers });
    }

    getRoles(token:string, rutarol:string): Observable<Rol[]> {
      const headers = new HttpHeaders({
        'x-token': `${token}`,
      'x-rol': `${rutarol}`
      });
        return this._http.get<Rol[]>(this.url + '/rol', { headers });
    }
    

       // Método para obtener todos los anticipos
  obtenerUsuario(token:string, rutarol:string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    console.log(this.url);
    
    return this._http.get<Usuario[]>(`${this.url}/`,{ headers });
  }

    // Método para registrar un Usuario
  registrarUsuario(usuario: Usuario,token:string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this._http.post<any>(`${this.url}/`, usuario,{ headers});
  }

   

    getUsuario(idUsuario: any): Observable<any> {//verificar en el backen si necesita parametro
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + idUsuario, { headers: headers });

    }

     // Método para actualizar un registro de usuario
     actualizarUsuario(usuario: Usuario, token: string, rutarol:string): Observable<void> {
      const headers = new HttpHeaders({
        'x-token': `${token}`,
        'x-rol': `${rutarol}`
      });
      return this._http.put<void>(`${this.url}/${usuario.id_usuario}`, usuario, { headers })
        .pipe(
          catchError(error => {
            console.error('Error al actualizar el anticipo:', error);
            return throwError('No se pudo actualizar el registro');
          })
        );
    }
    obtenerUsuarioPorId(id: number, token: string, rutarol:string): Observable<Usuario> {
      const headers = new HttpHeaders({
        'x-token': `${token}`,
      'x-rol': `${rutarol}`
      });
      return this._http.get<Usuario>(`${this.url}/${id}`, { headers })
        .pipe(
          catchError(error => {
            console.error('Error al obtener el usuario:', error);
            return throwError('No se pudo obtener el usuario');
          })
        );
    }

 // Eliminar (desactivar y activar)
 cambiarEstadoUsuario(idUsuario: number, estado: string,token:string, rutarol:string): Observable<any> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
      'x-rol': `${rutarol}`
  });
    return this._http.delete(`${this.url}/${idUsuario}`,  { headers });
  }

  buscarPorCi(ci: string,token:string,rutarol:string): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this._http.get<Usuario[]>(`${this.url}/buscar/${ci}`,{headers});
  }
}