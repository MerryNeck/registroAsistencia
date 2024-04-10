import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Excel } from '../models/excel.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = environment.backend.excel; 
  constructor(private http: HttpClient) { }
  subirArchivo(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    
    return this.http.post(this.apiUrl, formData);
  }
}
