import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { Permiso } from 'models/permiso.modelo';// Reemplaza 'ruta/del/modelo/descuento' con la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private baseUrl = 'api/anticipo'; // Reemplaza 'api/descuentos' con la ruta correcta de tu backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    const token = this.authService.getToken(); // Obtener el token JWT
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  // Método para obtener todos los permisos
  obtenerPermiso(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.baseUrl,{ headers: this.getHeaders() });
  }

  // Método para registrar un anticipos
  registrarPermiso(permiso: Permiso): Observable<any> {
    return this.http.post<any>(this.baseUrl, permiso,{ headers: this.getHeaders() });
  }

  // Método para actualizar un anticipo
  actualizarPermiso(permiso: Permiso): Observable<any> {
    const url = `${this.baseUrl}/${permiso.id_permiso}`;
    return this.http.put<any>(url, permiso,{ headers: this.getHeaders() });
  }

  // Método para eliminar un descuento (cambiar estado a inactivo)
  cambiarEstadoPermiso(idPermiso: number, estado: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cambiarEstado/${idPermiso}`, { estado }, { headers: this.getHeaders() });
  }

  buscarPorCi(ci: string): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.baseUrl}/buscar?ci=${ci}`);
  }
  
}