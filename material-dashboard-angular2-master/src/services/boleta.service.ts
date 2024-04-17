import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boleta } from 'models/boleta.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private apiUrl = environment.backend.api+'/api/boleta'; 

  constructor(private http: HttpClient) { }

  getBoletas(token:string, rutarol:string): Observable<Boleta[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
      
    });
    return this.http.get<Boleta[]>(this.apiUrl, { headers });
  }

  getBoleta(id: number,token:string, rutarol:string): Observable<Boleta> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
      
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Boleta>(url, { headers });
  }
  buscarPorCiOFecha(ci: string, fecha: string, token: string, rutarol:string): Observable<Boleta[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    });
    const body = { ci, fecha }; 

    return this.http.post<Boleta[]>(`${this.apiUrl}/buscar`, body, { headers });
  }
}