import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Excel } from '../models/excel.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = environment.backend.api+'/api/excel'; 
  constructor(private http: HttpClient) { }
  subirArchivo(archivo: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': `${token}`
    });
    const formData = new FormData();
    formData.append('archivo', archivo);
    console.log(formData);
    
    return this.http.post(this.apiUrl, formData, {headers});
  }
}
