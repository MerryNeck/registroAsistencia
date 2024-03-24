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
  nombreUsuario = '';
  fecha = '';

  constructor(private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.listarAsistencias();
  }

  listarAsistencias() {
    if (this.nombreUsuario || this.fecha) {
      // Obtener asistencias filtradas si hay valores en los campos de búsqueda
      this.asistenciaService.obtenerAsistenciasFiltradas(this.nombreUsuario, this.fecha).subscribe(
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

  imprimirAsistencia() {
    // Llamar al método de impresión del servicio
    this.asistenciaService.imprimirAsistencia(this.nombreUsuario, this.fecha);
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
