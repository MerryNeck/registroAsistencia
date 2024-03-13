import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { Area } from "models/area.model";
import { Rol } from 'models/rol.model';
//import { GLOBAL } from './GLOBAL';
interface RegistroResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
}) export class RegistroService {
    private url: any; // Reemplace con la URL de su API

    constructor(private _http: HttpClient) { }

    getAreas(): Observable<Area[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Area[]>(this.url + '/area/', { headers });
    }

    getRoles(): Observable<Rol[]> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get<Rol[]>(this.url + '/rol/', { headers });
    }

    insertUsuario(data: any): Observable<any> {
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
    }

    // ... (agregue otras funciones para obtener, actualizar y eliminar usuarios)

    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {

            errorMessage = 'An error occurred: ' + error.error.message;
        } else {

            errorMessage = `Backend returned code ${error.status}: ${error.body.error}`;
        }
        return throwError(errorMessage);
    }


    getUsuario(id_usuario: any): Observable<any> {//verificar en el backen si necesita parametro
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + "/usuario/" + id_usuario, { headers: headers });

    }

    updateUsuario(data: any): Observable<any> {

        const fd = new FormData();
        fd.append('id_usuario', data.id_usuario)
        fd.append('nombre', data.nombre);
        fd.append('aperllido_paterno', data.aperllido_paterno);
        fd.append('apellido_materno', data.apellido_materno);
        fd.append('ci', data.ci);
        fd.append('estado', data.estado);
        fd.append('fecha_creacion', data.fecha_creacion);
        fd.append('idRol', data.idRol);
        fd.append('idArea', data.idArea);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + '/registro/editar/' + data.id_usuario, fd);
    }

    delete_usuario(id_usuario: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'usuario/eliminar/' + id_usuario, { headers: headers });
    }

}