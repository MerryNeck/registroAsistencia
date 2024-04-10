import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; 
import { Permiso } from 'models/permiso.modelo';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private baseUrl = environment.backend.permiso ; 
  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    const token = this.authService.getToken(); // Obtener el token JWT
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  // Método para obtener todos los permisos
  obtenerPermiso(token:string): Observable<Permiso[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Permiso[]>(this.baseUrl,{ headers});
  }

  // Método para registrar un anticipos
  registrarPermiso(permiso: Permiso, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/registrar`, permiso,{ headers });
  }

  // Método para actualizar un anticipo
  actualizarPermiso(permiso: Permiso,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.baseUrl}/permiso${permiso.id_permiso}`;
    return this.http.put<any>(url, permiso,{ headers })
    .pipe(
      catchError(error => {
        console.error('Error al actualizar el permiso:', error);
        return throwError('No se pudo actualizar el permiso');
      })
    );
}
obtenerPermisoPorId(id: number, token: string): Observable<Permiso> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<Permiso>(`${this.baseUrl}/permiso/${id}`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al obtener el permiso:', error);
        return throwError('No se pudo obtener el permiso');
      })
    );
}

  // Método para eliminar un descuento (cambiar estado a inactivo)
  cambiarEstadoPermiso(idPermiso: number, estado: string, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(`${this.baseUrl}/cambiarEstado/${idPermiso}`, { estado }, { headers });
  }

  buscarPorCi(ci: string,token:string): Observable<Permiso[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Permiso[]>(`${this.baseUrl}/buscar?ci=${ci}`,{headers});
  }
  
}