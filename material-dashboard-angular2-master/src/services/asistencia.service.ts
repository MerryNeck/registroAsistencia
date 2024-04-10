import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asistencia } from '../models/asistencia.model';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = environment.backend.asistencia; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAsistencias(token: string): Observable<Asistencia[]> {
    const headers = this.getHeaders(token);
    return this.http.get<Asistencia[]>(this.apiUrl, { headers });
  }

  getAsistencia(id: number, token: string): Observable<Asistencia> {
    const headers = this.getHeaders(token);
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Asistencia>(url, { headers });
  }

  actualizarAsistencia(asistencia: Asistencia, token: string): Observable<any> {
    const headers = this.getHeaders(token);
    const url = `${this.apiUrl}/actualizar/${asistencia.id_asistencia}`;
    return this.http.put<Asistencia>(url, asistencia, { headers });
  }
  obtenerAsistenciaPorId(id: number, token: string): Observable<Asistencia> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Asistencia>(`${this.apiUrl}/editar/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el asistencia:', error);
          return throwError('No se pudo obtener el asistencia');
        })
      );

      
  }
  cambiarEstadoAsistencia(id: number, estado: string, token: string): Observable<any> {
    const headers = this.getHeaders(token);
    return this.http.patch(`${this.apiUrl}/cambiarEstado/${id}`, { estado }, { headers });
  }

  buscarPorCiOFecha(ci: string, fecha: string, token: string): Observable<Asistencia[]> {
    const headers = this.getHeaders(token);
    let queryParams = new HttpParams();
    if (ci) {
      queryParams = queryParams.append('ci', ci);
    }
    if (fecha) {
      queryParams = queryParams.append('fecha', fecha);
    }

    return this.http.get<Asistencia[]>(`${this.apiUrl}`, { params: queryParams, headers });
  }

  // Utiliza esta función para crear los headers con el token
  private getHeaders(token: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}

