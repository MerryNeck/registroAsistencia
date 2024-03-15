import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//

@Injectable({
  providedIn: 'root'
})
export class RolService {
  public url: any;
  
  constructor(
    private _http: HttpClient,
  ) { }

  //registrar
  insert_rol(data: any):Observable<any>{
    const fd = new FormData();
    fd.append('idArea',data.id_rol);
    fd.append('tipoArea',data.tipo);
    fd.append('fechaCreacion',data.fecha_creacion);
    fd.append('fechaModificacion',data.fecha_modificacion);
    fd.append('Estado',data.estado);
    
    return this._http.post(this.url + '/area/registrar',fd);
  }

  get_idRol(idRol: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/area/"+idRol,{headers:headers});

  }
  //editar 
  update_rol(data: any):Observable<any>{
    const fd = new FormData();
    fd.append('idArea',data.id_area);
    fd.append('tipoArea',data.tipo);
    fd.append('fechaCreacion',data.fecha_creacion);
    fd.append('fechaModificacion',data.fecha_modificacion);
    fd.append('Estado',data.estado);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + '/area/editar/'+data.idArea+'/',fd);
  }
  
  // Eliminar (desactivar y activar)
  desactivarRol(idRol: number, nuevoEstado: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ estado: nuevoEstado});
    return this._http.put(this.url+"/area/"+idRol,body,{headers:headers});
  }

  
}