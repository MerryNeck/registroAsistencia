import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anticipo } from 'models/anticipo.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnticipoService {
  private baseUrl =  environment.backend.api+'/api/anticipo'; 
  constructor(private http: HttpClient, ) { }


  // Método para obtener todos los anticipos
  obtenerAnticipo(token: string, rutarol:string): Observable<Anticipo[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol':`${rutarol}`
    });
    return this.http.get<Anticipo[]>(this.baseUrl, { headers });
  }

  // Método para registrar un anticipo
  registrarAnticipo(anticipo: Anticipo, token: string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol':`${rutarol}`
    });
    return this.http.post(`${this.baseUrl}`, anticipo, { headers });
  }

  

  // Método para eliminar un anticipo (cambiar estado a inactivo)
  cambiarEstadoAnticipo(idAnticipo: number, estado: string, token: string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol':`${rutarol}`
    });
    return this.http.delete(`${this.baseUrl}${idAnticipo}`, { headers });
  }

  buscarPorCi(ci: string, token: string ,rutarol:string): Observable<Anticipo[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol':`${rutarol}`
    });
    return this.http.get<Anticipo[]>(`${this.baseUrl}/buscar/${ci}`, { headers });
  }
  // Método para actualizar un anticipo
  actualizarAnticipo(anticipo: Anticipo, token: string, rutarol:string): Observable<void> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol':`${rutarol}`
    });
    return this.http.put<void>(`${this.baseUrl}//${anticipo.id_anticipo}`, anticipo, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el anticipo:', error);
          return throwError('No se pudo actualizar el anticipo');
        })
      );
  }
  obtenerAnticipoPorId(id: number, token: string, rutarol:string): Observable<Anticipo> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol':`${rutarol}`
    });
    return this.http.get<Anticipo>(`${this.baseUrl}${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el anticipo:', error);
          return throwError('No se pudo obtener el anticipo');
        })
      );
  }

  
}