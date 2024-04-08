import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'http://localhost:3000/asistencia'; // Cambiar la URL según tu configuración

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAsistencias(): Observable<Asistencia[]> {
    const headers = this.getHeaders();
    return this.http.get<Asistencia[]>(this.apiUrl, { headers: this.getHeaders()});
  }

  getAsistencia(id: number): Observable<Asistencia> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Asistencia>(url, { headers : this.getHeaders()});
  }
  updateAsistencia(asistencia: Asistencia): Observable<any> {
    
    const url = `${this.apiUrl}/${asistencia.id_asistencia}`;
    return this.http.put<Asistencia>(url, asistencia, { headers: this.getHeaders() });
  }

  // token
  getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // estado
  cambiarEstadoAsistencia(id: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cambiarEstado/${id}`, { estado }, { headers: this.getHeaders() });
  }

  //busqueda
  buscarPorCiOFecha(ci?: string, fecha?: string): Observable<Asistencia[]> {
    let queryParams = '';

    if (ci) {
      queryParams += `ci=${ci}`;
    }

    if (fecha) {
      if (queryParams.length) {
        queryParams += '&';
      }
      queryParams += `fecha=${fecha}`;
    }

    return this.http.get<Asistencia[]>(`${this.apiUrl}?${queryParams}`);
  }
}

