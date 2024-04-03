import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from 'models/rol.model';  

@Injectable({
  providedIn: 'root'
})

export class RolService {
  private url = 'http://ejemplo.com/api/area'; // Reemplazar con la URL real de tu API

  constructor(private http: HttpClient) { }

  // tocken
  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  // registrar rol
  registrarRol(rol: Rol): Observable<any> {
    return this.http.post(`${this.url}/registrar`, rol, { headers: this.getHeaders() });
  }

  // listar todas las roles
  listarRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.url}/listar`, { headers: this.getHeaders() });
  }

//actualizar un rol
  actualizarRol(rol: Rol): Observable<any> {
    return this.http.put(`${this.url}/actualizar/${rol.id_rol}`, rol, { headers: this.getHeaders() });
  }

  //  estado de un rol
  cambiarEstadoRol(idRol: number, estado: string): Observable<any> {
    return this.http.patch(`${this.url}/cambiarEstado/${idRol}`, { estado }, { headers: this.getHeaders() });
  }
}