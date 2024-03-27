import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anticipo } from 'models/anticipo.model';  // Reemplaza 'ruta/del/modelo/descuento' con la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class AnticipoService {
  private baseUrl = 'api/descuentos'; // Reemplaza 'api/descuentos' con la ruta correcta de tu backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los descuentos
  obtenerDescuentos(): Observable<Anticipo[]> {
    return this.http.get<Anticipo[]>(this.baseUrl);
  }

  // Método para registrar un descuento
  registrarDescuento(anticipo: Anticipo): Observable<any> {
    return this.http.post<any>(this.baseUrl, anticipo);
  }

  // Método para actualizar un descuento
  actualizarDescuento(anticipo: Anticipo): Observable<any> {
    const url = `${this.baseUrl}/${anticipo.id_anticipo}`;
    return this.http.put<any>(url, anticipo);
  }

  // Método para eliminar un descuento (cambiar estado a inactivo)
  eliminarDescuento(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}