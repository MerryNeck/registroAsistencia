import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Area } from 'models/area.model';  
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AreaService {
  private url = environment.backend.api+'/api/area/';

  constructor(private http: HttpClient) { }

  // registrar  área
  registrarArea(area: Area, token:string, rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    })
    return this.http.post(`${this.url}`, area, { headers});
  }

  // listar todas las áreas
  listarAreas(token:string , rutarol:string): Observable<Area[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    })
    return this.http.get<Area[]>(`${this.url}`, { headers});
  }

//actualizar un área
  actualizarArea(area: Area, token: string, rutarol:string): Observable<void> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    })
    return this.http.put<void>(`${this.url}/${area.id_area}`, area, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el area:', error);
          return throwError('No se pudo actualizar el area');
        })
      );
  }
  obtenerAreaPorId(id: number, token: string , rutarol:string): Observable<Area> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    })
    return this.http.get<Area>(`${this.url}${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el area:', error);
          return throwError('No se pudo obtener el area');
        })
      );
  }

  //  estado de un área 
  cambiarEstadoArea(idArea: number, estado: string ,token:string , rutarol:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`,
      'x-rol': `${rutarol}`
    })
    return this.http.delete(`${this.url}${idArea}`, { headers });
  }

  
}
