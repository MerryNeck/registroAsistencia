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

    constructor(private _http: HttpClient, private authService: AuthService) { }

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
    // Método para registrar un anticipos
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this._http.post<any>(this.url, usuario,{ headers: this.getHeaders() });
  }
    /*insertUsuario(data: any): Observable<any> {
        const fd = new FormData();
        fd.append('id_usuario', data.id_usuario);
        fd.append('nombre', data.nombre);
        fd.append('aperllido_paterno', data.apellido_paterno);
        fd.append('apellido_materno', data.apellido_materno);
        fd.append('ci', data.ci);
        fd.append('estado', data.estado);
        fd.append('fecha_creacion', data.fecha_creacion);
        fd.append('idRol', data.idRol);
        fd.append('idArea', data.idArea);


        return this._http.post<any>(this.url + '/registrar', fd, {
            observe: 'response' // Observe the full response, including status code
        }).pipe(
            catchError(this.handleError)
        );
    }*/


    getUsuario(idUsuario: any): Observable<any> {//verificar en el backen si necesita parametro
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "/usuario/" + idUsuario, { headers: headers });

    }

    actualizarAnticipo(usuario: Usuario): Observable<any> {
        const url = `${this.url}/${usuario.id_usuario}`;
        return this._http.put<any>(url, usuario,{ headers: this.getHeaders() });
      }

 // Eliminar (desactivar y activar)
 desactivarArea(idUsuario: number, nuevoEstado: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ estado: nuevoEstado});
    return this._http.put(this.url+"/usuario/"+idUsuario,body,{headers:headers});
  }
}