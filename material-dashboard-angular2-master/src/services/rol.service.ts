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
  private url = environment.backend.rol; // Reemplazar con la URL real de tu API

  constructor(private http: HttpClient) { }

  // tocken
  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  // registrar rol
  registrarRol(rol: Rol,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url}/registrar`, rol, { headers });
  }

  // listar todas las roles
  listarRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.url}/listar`, { headers: this.getHeaders() });
  }

  //  estado de un rol
  cambiarEstadoRol(idRol: number, estado: string,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(`${this.url}/cambiarEstado/${idRol}`, { estado }, { headers });
  }
  // Método para actualizar un anticipo
  actualizarRol(rol: Rol, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<void>(`${this.url}/rol/${rol.id_rol}`, rol, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el anticipo:', error);
          return throwError('No se pudo actualizar el anticipo');
        })
      );
  }
  obtenerAnticipoPorId(id: number, token: string): Observable<Rol> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Rol>(`${this.url}/rol/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el anticipo:', error);
          return throwError('No se pudo obtener el anticipo');
        })
      );
  }

}