import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'http://localhost:3000/asistencia'; // Cambiar la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Obtener todas las asistencias
  obtenerAsistencias(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.apiUrl);
  }

  // Obtener asistencias con filtros de nombre de usuario y fecha
  obtenerAsistenciasFiltradas(ci: string, fecha: string): Observable<Asistencia[]> {
    let params = new HttpParams();
    if (ci) {
      params = params.set('nombreUsuario', ci);
    }
    if (fecha) {
      params = params.set('fecha', fecha);
    }
    return this.http.get<Asistencia[]>(this.apiUrl, { params });
  }

  // Actualizar una asistencia existente
  actualizarAsistencia(id: number, asistencia: Asistencia): Observable<Asistencia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Asistencia>(url, asistencia);
  }

  // estado
  cambiarEstadoAsistencia(id: number, estado: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const body = { estado };
    return this.http.patch<void>(url, body);
  }

  // Imprimir asistencia
  imprimirAsistencia(ci: string, fecha: string) {
    const params = new HttpParams()
      .set('cedulaIdentidad', ci)
      .set('fecha', fecha);
    const options = { params, responseType: 'blob' as 'json' }; 
    this.http.get(`${this.apiUrl}/print`, options).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' }); 
      const url = window.URL.createObjectURL(blob); 
      window.open(url); 
    });
  }
}
