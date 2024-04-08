import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { Anticipo } from 'models/anticipo.model';  // Reemplaza 'ruta/del/modelo/descuento' con la ruta correcta
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AnticipoService {
  private Gurl = environment.backend.api
  private baseUrl = this.Gurl+'api/anticipo'; // Reemplaza 'api/descuentos' con la ruta correcta de tu backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    const token = this.authService.getToken(); // Obtener el token JWT
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  // Método para obtener todos los anticipos
  obtenerAnticipo(): Observable<Anticipo[]> {
    return this.http.get<Anticipo[]>(this.baseUrl,{ headers: this.getHeaders() });
  }

  // Método para registrar un anticipos
  registrarAnticipo(anticipo: Anticipo): Observable<any> {
    return this.http.post<any>(this.baseUrl, anticipo,{ headers: this.getHeaders() });
  }

  // Método para actualizar un anticipo
  actualizarAnticipo(anticipo: Anticipo): Observable<any> {
    const url = `${this.baseUrl}/${anticipo.id_anticipo}`;
    return this.http.put<any>(url, anticipo,{ headers: this.getHeaders() });
  }

  // Método para eliminar un descuento (cambiar estado a inactivo)
  cambiarEstadoAnticipo(idAnticipo: number, estado: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cambiarEstado/${idAnticipo}`, { estado }, { headers: this.getHeaders() });
  }

  buscarPorCi(ci: string): Observable<Anticipo[]> {
    return this.http.get<Anticipo[]>(`${this.baseUrl}/buscar?ci=${ci}`);
  }
  
}