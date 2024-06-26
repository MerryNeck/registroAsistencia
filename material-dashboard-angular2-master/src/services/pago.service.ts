import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pago } from 'models/pago.model'; 
 import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private baseUrl = environment.backend.api+ '/api/pago'; 
  constructor(private http: HttpClient) { }

  getHeaders(token:string, rutarol:string) {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
  }
  // Método para obtener todos los pago
  obtenerPago(token:string, rutarol:string): Observable<Pago[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.get<Pago[]>(this.baseUrl,{ headers});
  }

  // Método para registrar un pago
  registrarPago(pago: Pago ,ci : any , token:string, rutarol:string): Observable<any> {
    console.log(pago);
    
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    const data = {
      ci : ci ,
      dias_trabajo : pago.dias_trabajado,
      sueldo  : pago.sueldo
    }
    return this.http.post<any>(`${this.baseUrl}/`, data,{ headers });
  }

  // Método para actualizar un pago
  actualizarPago(pago: Pago,token:string,rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.put<void>(`${this.baseUrl}/${pago.id_sueldo}`, pago, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el pago:', error);
          return throwError('No se pudo actualizar el pago');
        })
      );
  }
  obtenerPagoPorId(id: number, token: string,rutarol:string): Observable<Pago> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.get<Pago>(`${this.baseUrl}/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el pago:', error);
          return throwError('No se pudo obtener el pago');
        })
      );
  }

  // Método para eliminar un descuento (cambiar estado a inactivo)
  cambiarEstadoPago(idPago: number, estado: string, token:string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.delete(`${this.baseUrl}/${idPago}`, { headers});
  }
  buscarPorCi(ci: string,token:string, rutarol): Observable<Pago[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    return this.http.get<Pago[]>(`${this.baseUrl}/buscar/${ci}`,{headers});
  }
}