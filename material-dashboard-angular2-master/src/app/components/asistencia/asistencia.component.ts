import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'models/asistencia.model';
import { AsistenciaService } from 'services/asistencia.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  ciBusqueda: string = '';
  fechaBusqueda: string = '';
  asistencias: Asistencia[] = [];
  asistenciaSeleccionada: Asistencia | null = null;

  
 info=[{
  id_asistencia : 1,
  fecha :'20240301',
  id_excel: 100,
  tprano_ingreso:'8:30',
  rde_ingreso: '12:30',
  min_retardos :'0',
  min_adelantado:'10',
  faltas:'',
  total_horas : '480',
  tprano_salida :'12:00',
  tde_salida: '16:30',
  id_usuario:'miriam',
  apellido:'justo',
  min_extra: '100',
  id_permiso:null,
  hrs_no_recuperadas:1,
  descuento:'',
  estado : 's',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '' ,
},{
  id_asistencia : 2,
  fecha :'20240301',
  id_excel: 100,
  tprano_ingreso:'8:30',
  rde_ingreso: '12:30',
  min_retardos :'0',
  min_adelantado:'10',
  faltas:'',
  total_horas : '480',
  tprano_salida :'12:00',
  tde_salida: '16:30',
  id_usuario:'1',
  min_extra: '100',
  id_permiso:null,
  hrs_no_recuperadas:1,
  descuento:'',
  estado : 's',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '' ,
}]

  constructor(private asistenciaService: AsistenciaService, private http: HttpClient) { }

  ngOnInit(): void {
    this.listarAsistencias();
  }

  listarAsistencias(): void {
    this.asistenciaService.getAsistencias()
      .subscribe(asistencias => this.asistencias = asistencias);
  }

  seleccionarAsistencia(asistencia: Asistencia): void {
    this.asistenciaSeleccionada = asistencia;
  }
  actualizarAsistencia(): void {
    if (this.asistenciaSeleccionada) {
      this.asistenciaService.updateAsistencia(this.asistenciaSeleccionada)
        .subscribe(asistencia => {
          const index = this.asistencias.findIndex(a => a.id_asistencia === asistencia.id_asistencia);
          this.asistencias[index] = asistencia;
          this.asistenciaSeleccionada = null;
        });
    }
  }

  imprimirAsistencia(): void {
    const url = 'http://localhost:3000/api/asistencias/pdf'; // Reemplaza con la URL correcta de tu servidor

    this.http.get(url, { responseType: 'blob' })
      .subscribe((pdfBlob: Blob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      }, (error) => {
        console.error('Error al obtener el PDF de asistencias:', error);
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
  buscarAsistencia(): void {
    this.asistenciaService.buscarPorCiOFecha(this.ciBusqueda, this.fechaBusqueda)
      .subscribe(asistencias => {
        this.asistencias = asistencias;
      }, error => {
        console.error('Error al buscar asistencias:', error);
      });
  }
  
}

