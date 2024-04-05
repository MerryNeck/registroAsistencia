import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { Area } from "models/area.model";
import { Rol } from 'models/rol.model';
import { Usuario } from 'models/usuario.model';
import { AuthService } from './auth.service';
//import { GLOBAL } from './GLOBAL';
interface RegistroResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
}) export class RegistroService {
    private url: any; // Reemplace con la URL de su API

    constructor(private _http: HttpClient, private authService:AuthService) { }

    getAreas(): Observable<Area[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Area[]>(this.url + '/area/', { headers });
    }

    getRoles(): Observable<Rol[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Rol[]>(this.url + '/rol/', { headers });
    }
    getHeaders() {
        const token = this.authService.getToken(); // Obtener el token JWT
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }

       // Método para obtener todos los anticipos
  obtenerUsuario(): Observable<Usuario[]> {
    return this._http.get<Usuario[]>(this.url,{ headers: this.getHeaders() });
  }

    // Método para registrar un Usuario
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this._http.post<any>(this.url, usuario,{ headers: this.getHeaders() });
  }

   

    getUsuario(idUsuario: any): Observable<any> {//verificar en el backen si necesita parametro
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "/usuario/" + idUsuario, { headers: headers });

    }

     // Método para actualizar un registro de usuario
  actualizarUsuario(usuario: Usuario): Observable<any> {
    const url = `${this.url}/${usuario.id_usuario}`;
    return this._http.put<any>(url, usuario,{ headers: this.getHeaders() });
  }


 // Eliminar (desactivar y activar)
 cambiarEstadoUsuario(idUsuario: number, estado: string): Observable<any> {
    return this._http.patch(`${this.url}/cambiarEstado/${idUsuario}`, { estado }, { headers: this.getHeaders() });
  }
}