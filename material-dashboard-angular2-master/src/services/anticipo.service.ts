import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Anticipo } from 'models/anticipo.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnticipoService {
  private baseUrl =  environment.backend.anticipo; 
  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    const token = this.authService.getToken(); // Obtener el token JWT
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener todos los anticipos
  obtenerAnticipo(token: string): Observable<Anticipo[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Anticipo[]>(this.baseUrl, { headers });
  }

  // Método para registrar un anticipo
  registrarAnticipo(anticipo: Anticipo, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/registrar`, anticipo, { headers });
  }

  

  // Método para eliminar un anticipo (cambiar estado a inactivo)
  cambiarEstadoAnticipo(idAnticipo: number, estado: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(`${this.baseUrl}/cambiarEstado/${idAnticipo}`, { estado }, { headers });
  }

  buscarPorCi(ci: string, token: string): Observable<Anticipo[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Anticipo[]>(`${this.baseUrl}/buscar?ci=${ci}`, { headers });
  }
  // Método para actualizar un anticipo
  actualizarAnticipo(anticipo: Anticipo, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<void>(`${this.baseUrl}/anticipo/${anticipo.id_anticipo}`, anticipo, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el anticipo:', error);
          return throwError('No se pudo actualizar el anticipo');
        })
      );
  }
  obtenerAnticipoPorId(id: number, token: string): Observable<Anticipo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Anticipo>(`${this.baseUrl}/anticipo/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el anticipo:', error);
          return throwError('No se pudo obtener el anticipo');
        })
      );
  }

  
}