import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'models/asistencia.model';
import { AsistenciaService } from 'services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  asistencias: Asistencia[] = [];
  ci = '';
  fecha = '';

  constructor(private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.listarAsistencias();
  }

  listarAsistencias() {
    if (this.ci || this.fecha) {
      // Obtener asistencias filtradas si hay valores en los campos de búsqueda
      this.asistenciaService.obtenerAsistenciasFiltradas(this.ci, this.fecha).subscribe(
        asistencias => this.asistencias = asistencias,
        error => console.error('Error al obtener asistencias:', error)
      );
    } else {
      // Obtener todas las asistencias si no hay valores en los campos de búsqueda
      this.asistenciaService.obtenerAsistencias().subscribe(
        asistencias => this.asistencias = asistencias,
        error => console.error('Error al obtener asistencias:', error)
      );
    }
  }

  // imprimir 
  imprimirAsistencia() {
    if (!this.ci || !this.fecha) {
      alert('Por favor, ingrese CI y fecha para imprimir la asistencia.');
      return;
    }
    this.asistenciaService.imprimirAsistencia(this.ci, this.fecha).subscribe(data => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); // Asegúrate de permitir ventanas emergentes para tu sitio.
    }, error => {
      console.error('Error al descargar el PDF:', error);
      alert('No se pudo descargar el PDF. Por favor, intente de nuevo más tarde.');
    });
  }

  // Método para cambiar el estado de una asistencia
  cambiarEstadoAsistencia(id: number, estado: string) {
    this.asistenciaService.cambiarEstadoAsistencia(id, estado).subscribe(
      () => {
        console.log('Estado de la asistencia cambiado correctamente.');
        this.listarAsistencias(); // Recargar la lista de asistencias después de cambiar el estado
      },
      error => console.error('Error al cambiar estado de la asistencia:', error)
    );
  }
}

