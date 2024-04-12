import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from 'models/rol.model';  
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RolService {
  private url = environment.backend.api + '/api/rol'; 
  constructor(private http: HttpClient) { }
  // registrar rol
  registrarRol(rol: Rol,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.post(`${this.url}/registrar`, rol, { headers });
  }

  // listar todas las roles
  listarRol(token:string): Observable<Rol[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.get<Rol[]>(`${this.url}`, { headers});
  }

  //  estado de un rol
  cambiarEstadoRol(idRol: number, estado: string,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.patch(`${this.url}/cambiarEstado/${idRol}`, { estado }, { headers });
  }
  // Método para actualizar un anticipo
  actualizarRol(rol: Rol, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.put<void>(`${this.url}/actualizar/${rol.id_rol}`, rol, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el rol:', error);
          return throwError('No se pudo actualizar el rol');
        })
      );
  }
  obtenerRolPorId(id: number, token: string): Observable<Rol> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });;
    return this.http.get<Rol>(`${this.url}/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el rol:', error);
          return throwError('No se pudo obtener el rol');
        })
      );
  }

}