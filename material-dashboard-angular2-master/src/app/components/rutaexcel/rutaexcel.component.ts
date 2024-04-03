import { Component, OnInit } from '@angular/core';
import { Excel } from 'models/excel.model';
import { ExcelService } from 'services/excel.service';

@Component({
  selector: 'app-rutaexcel',
  templateUrl: './rutaexcel.component.html',
  styleUrls: ['./rutaexcel.component.css']
})
export class RutaexcelComponent implements OnInit {

  nuevoExcel: Excel = new Excel(0, [], '', '', ''); 
  excels: Excel[] = []; 

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
    this.obtenerExcels(); 
  }

  // Método para obtener todos los excels
  obtenerExcels() {
    this.excelService.obtenerExcels().subscribe(
      excels => this.excels = excels,
      error => console.error('Error al obtener excels:', error)
    );
  }

  // Método para registrar un nuevo excel
  registrarExcel() {
    this.excelService.registrarExcel(this.nuevoExcel).subscribe(
      response => {
        console.log('Excel registrado:', response);
        this.obtenerExcels(); 
      },
      error => console.error('Error al registrar excel:', error)
    );
  }

  // Método para procesar y guardar el archivo Excel en la tabla de asistencia
  procesarExcel(archivo: File) {
    this.excelService.procesarExcel(archivo).subscribe(
      response => {
        console.log('Excel procesado y guardado en la tabla de asistencia:', response);
      },
      error => console.error('Error al procesar el archivo Excel:', error)
    );
  }
  cargarExcel(event: any) {
    const archivoSeleccionado = event.target.files[0];
    if (archivoSeleccionado) {
      this.procesarExcel(archivoSeleccionado);
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }
}