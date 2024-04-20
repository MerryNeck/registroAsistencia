import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Permiso } from 'models/permiso.modelo';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private baseUrl = environment.backend.api+'/api/permiso' ; 
  constructor(private http: HttpClient) { }

  
  // Método para obtener todos los permisos
  obtenerPermiso(token:string,rutarol:string): Observable<Permiso[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.get<Permiso[]>(this.baseUrl,{ headers});
  }

  // Método para registrar un anticipos
  registrarPermiso(permiso: Permiso, token:string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.post<any>(`${this.baseUrl}`, permiso,{ headers });
  }

  // Método para actualizar un anticipo
  actualizarPermiso(permiso: Permiso,token:string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    const url = `${this.baseUrl}/${permiso.id_permiso}`;
    return this.http.put<any>(url, permiso,{ headers })
    .pipe(
      catchError(error => {
        console.error('Error al actualizar el permiso:', error);
        return throwError('No se pudo actualizar el permiso');
      })
    );
}
obtenerPermisoPorId(id: number, token: string, rutarol:string): Observable<Permiso> {
  const headers = new HttpHeaders({
    'x-token': `${token}`,
      'x-rol': `${rutarol}`
  });
  return this.http.get<Permiso>(`${this.baseUrl}${id}`, { headers })
    .pipe(
      catchError(error => {
        console.error('Error al obtener el permiso:', error);
        return throwError('No se pudo obtener el permiso');
      })
    );
}

  // Método para eliminar un descuento (cambiar estado a inactivo)
  cambiarEstadoPermiso(idPermiso: number, estado: string, token:string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.delete(`${this.baseUrl}${idPermiso}`, { headers });
  }

  buscarPorCi(ci: string,token:string, rutarol:string): Observable<Permiso[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.get<Permiso[]>(`${this.baseUrl}/buscar/${ci}`,{headers});
  }
  
}