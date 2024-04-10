import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boleta } from 'models/boleta.model';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private apiUrl = environment.backend.boleta; 

  constructor(private http: HttpClient, private authService:AuthService) { }

  getBoletas(): Observable<Boleta[]> {
    const headers = this.getHeaders();
    return this.http.get<Boleta[]>(this.apiUrl, { headers });
  }

  getBoleta(id: number): Observable<Boleta> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Boleta>(url, { headers });
  }

  updateBoleta(boleta: Boleta): Observable<Boleta> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${boleta.id}`;
    return this.http.put<Boleta>(url, boleta, { headers });
  }

  
 // token
 getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}