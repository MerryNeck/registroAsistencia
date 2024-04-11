import { Component, OnInit } from '@angular/core';
import { Excel } from 'models/excel.model';
import { ExcelService } from 'services/excel.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rutaexcel',
  templateUrl: './rutaexcel.component.html',
  styleUrls: ['./rutaexcel.component.css']
})
export class RutaexcelComponent {

  archivoSeleccionado: File | null = null;
  nombreArchivo: string = '';

  constructor(private excelService: ExcelService) { }
  onArchivoSeleccionado(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const esExcel = archivo.name.endsWith('.xlsx') || archivo.name.endsWith('.xls');
      if (!esExcel) {
        this.archivoSeleccionado = null;
        Swal.fire({
          icon: 'error',
          title: 'Archivo no permitido',
          text: 'Por favor, selecciona un archivo de Excel.',
        });
        return;
      }
      this.archivoSeleccionado = archivo;
      this.nombreArchivo = archivo.name;
    }
  }

  subirArchivo() {
    if (!this.archivoSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: 'No hay archivo',
        text: 'Por favor, selecciona un archivo de Excel para subir.',
      });
      return;
    }
    
    this.excelService.subirArchivo(this.archivoSeleccionado)
      .subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Archivo subido',
            text: 'El archivo se ha subido exitosamente.',
          });
          console.log('Archivo subido exitosamente', response);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al subir el archivo',
            text: 'Hubo un problema al subir el archivo, intenta de nuevo.',
          });
          console.error('Error al subir el archivo', error);
        }
      );
  }


  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.archivoSeleccionado = event.dataTransfer.files[0];
    this.nombreArchivo = this.archivoSeleccionado.name;
  }

}
