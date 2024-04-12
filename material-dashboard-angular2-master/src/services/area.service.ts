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
  private url = environment.backend.api+'/api/area/area';

  constructor(private http: HttpClient) { }

  // registrar  área
  registrarArea(area: Area, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    })
    return this.http.post(`${this.url}/registrar`, area, { headers});
  }

  // listar todas las áreas
  listarAreas(token:string): Observable<Area[]> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    })
    return this.http.get<Area[]>(`${this.url}`, { headers});
  }

//actualizar un área
  actualizarArea(area: Area, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    })
    return this.http.put<void>(`${this.url}/actualizar/${area.id_area}`, area, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el area:', error);
          return throwError('No se pudo actualizar el area');
        })
      );
  }
  obtenerAreaPorId(id: number, token: string): Observable<Area> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    })
    return this.http.get<Area>(`${this.url}/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener el area:', error);
          return throwError('No se pudo obtener el area');
        })
      );
  }

  //  estado de un área 
  cambiarEstadoArea(idArea: number, estado: string ,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'x-token': `${token}`
    })
    return this.http.patch(`${this.url}/cambiarEstado/${idArea}`, { estado }, { headers });
  }

  
}
