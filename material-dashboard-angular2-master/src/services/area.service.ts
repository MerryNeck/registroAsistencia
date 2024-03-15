import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";//

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  public url: any;
  
  constructor(
    private _http: HttpClient,
  ) { }

  //registrar
  insert_area(data: any):Observable<any>{
    const fd = new FormData();
    fd.append('idArea',data.id_area);
    fd.append('tipoArea',data.tipo_area);
    fd.append('fechaCreacion',data.fecha_creacion);
    fd.append('fechaModificacion',data.fecha_modificacion);
    fd.append('Estado',data.estado);
    
    return this._http.post(this.url + '/area/registrar',fd);
  }

  get_idArea(idArea: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/area/"+idArea,{headers:headers});

  }
  //editar 
  update_area(data: any):Observable<any>{
    const fd = new FormData();
    fd.append('idArea',data.id_area);
    fd.append('tipoArea',data.tipo_area);
    fd.append('fechaCreacion',data.fecha_creacion);
    fd.append('fechaModificacion',data.fecha_modificacion);
    fd.append('Estado',data.estado);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + '/area/editar/'+data.idArea+'/',fd);
  }
  
  // Eliminar (desactivar y activar)
  desactivarArea(idArea: number, nuevoEstado: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ estado: nuevoEstado});
    return this._http.put(this.url+"/area/"+idArea,body,{headers:headers});
  }

  
}