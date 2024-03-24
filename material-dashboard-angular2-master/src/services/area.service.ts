import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from 'models/area.model';  

@Injectable({
  providedIn: 'root'
})

export class AreaService {
  private url = 'http://ejemplo.com/api/area'; // Reemplazar con la URL real de tu API

  constructor(private http: HttpClient) { }

  // token
  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  // registrar  área
  registrarArea(area: Area): Observable<any> {
    return this.http.post(`${this.url}/registrar`, area, { headers: this.getHeaders() });
  }

  // listar todas las áreas
  listarAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.url}/listar`, { headers: this.getHeaders() });
  }

//actualizar un área
  actualizarArea(area: Area): Observable<any> {
    return this.http.put(`${this.url}/actualizar/${area.id_area}`, area, { headers: this.getHeaders() });
  }

  //  estado de un área 
  cambiarEstadoArea(idArea: number, estado: string): Observable<any> {
    return this.http.patch(`${this.url}/cambiarEstado/${idArea}`, { estado }, { headers: this.getHeaders() });
  }
}
