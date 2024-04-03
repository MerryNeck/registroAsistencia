import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import { Pago } from 'models/pago.model';  // Reemplaza 'ruta/del/modelo/descuento' con la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private baseUrl = 'api/pago'; // Reemplaza 'api/descuentos' con la ruta correcta de tu backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    const token = this.authService.getToken(); // Obtener el token JWT
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  // Método para obtener todos los pago
  obtenerPago(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.baseUrl,{ headers: this.getHeaders() });
  }

  // Método para registrar un pago
  registrarPago(pago: Pago): Observable<any> {
    return this.http.post<any>(this.baseUrl, pago,{ headers: this.getHeaders() });
  }

  // Método para actualizar un pago
  actualizarPago(pago: Pago): Observable<any> {
    const url = `${this.baseUrl}/${pago.id_sueldo}`;
    return this.http.put<any>(url, pago,{ headers: this.getHeaders() });
  }

  // Método para eliminar un descuento (cambiar estado a inactivo)
  //  estado de un área 
  cambiarEstadoPago(idPago: number, estado: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cambiarEstado/${idPago}`, { estado }, { headers: this.getHeaders() });
  }
}