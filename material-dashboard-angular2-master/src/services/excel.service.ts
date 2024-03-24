import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Excel } from '../models/excel.model';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/excels'; // Cambiar la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Obtener todos los excels
  obtenerExcels(): Observable<Excel[]> {
    return this.http.get<Excel[]>(this.apiUrl);
  }

  // Registrar un nuevo excel
  registrarExcel(excel: Excel): Observable<any> {
    return this.http.post(this.apiUrl, excel);
  }

  // Procesar archivo Excel y guardar en la tabla de asistencia
  procesarExcel(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);

    // Enviar el archivo al servidor para procesarlo y guardar en la tabla de asistencia
    return this.http.post('http://localhost:3000/asistencia', formData);
  }
}
