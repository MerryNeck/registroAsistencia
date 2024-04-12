import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asistencia } from '../models/asistencia.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = environment.backend.api; 

  constructor(private http: HttpClient) { }

  getAsistencias(token: string): Observable<Asistencia[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.get<Asistencia[]>(this.apiUrl+'/api/asistencia', { headers });
  }

  getAsistencia(id: number, token: string): Observable<Asistencia> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Asistencia>(url, { headers });
  }

  actualizarAsistencia(asistencia: Asistencia, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });

    const url = `${this.apiUrl}/api/asistencia/actualizar/${asistencia.id_asistencia}`;
    return this.http.put<Asistencia>(url, asistencia, { headers });
  }
  obtenerAsistenciaPorId(id: number, token: string): Observable<Asistencia> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.get<Asistencia>(`${this.apiUrl}/api/asistencia/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el asistencia:', error);
          return throwError('No se pudo obtener el asistencia');
        })
      );

      
  }
  cambiarEstadoAsistencia(id: number, estado: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    return this.http.patch(`${this.apiUrl}/api/asistencia/cambiarEstado/${id}`, { estado }, { headers });
  }

  buscarPorCiOFecha(ci: string, fecha: string, token: string): Observable<Asistencia[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    const body = { ci, fecha }; // Objeto con los datos a enviar en el cuerpo de la solicitud

    return this.http.post<Asistencia[]>(`${this.apiUrl}/api/asistencia/buscar`, body, { headers });
  }

  
}

