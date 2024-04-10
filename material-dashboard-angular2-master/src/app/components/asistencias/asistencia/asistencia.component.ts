import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'models/asistencia.model';
import { AsistenciaService } from 'services/asistencia.service';
import { HttpClient } from '@angular/common/http';
import * as printJS from 'print-js';
import Swal from 'sweetalert2';

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
  isSidebarActive: boolean = false;
  token:string='';

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  
 info=[{
  id_asistencia : 1,
  fecha :'20240301',
  ci:'13276634',
  id_excel: 100,
  tprano_ingreso:'8:30',
  tde_ingreso: '12:30',
  min_retardos :'0',
  min_adelantado:'10',
  faltas:'',
  total_horas : '480',
  tprano_salida :'12:00',
  tde_salida: '16:30',
  nombre:'miriam',
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
  tde_ingreso: '12:30',
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
    this.asistenciaService.getAsistencias(this.token)
      .subscribe(asistencias => this.asistencias = asistencias),
      error => Swal.fire('Error', 'No se pudieron obtener los datos de asistencia', 'error')
      ;
  }

  seleccionarAsistencia(asistencia: Asistencia): void {
    this.asistenciaSeleccionada = { ...asistencia };
  }
  imprimirAsistencia(): void {
    const filasHTML: string[] = [];

    this.info.forEach(asistencia => {
      let filaHTML = '<tr>';

      // Índices de las columnas que deseas imprimir
      const columnasImprimir = ['fecha', 'id_usuario', 'apellido', 'tprano_ingreso', 'tprano_salida',
        'tde_ingreso','tde_salida','min_retardados','min_extra','faltas', 'total_horas','id_permiso','hrs_no_recuperadas'
      ]; 

      columnasImprimir.forEach(columna => {
        filaHTML += `<td>${asistencia[columna]}</td>`;
      });

      filaHTML += '</tr>';
      filasHTML.push(filaHTML);
    });

    const tablaHTML = `<table>${filasHTML.join('')}</table>`; // Crear la tabla HTML

    printJS({
      printable: 'table', // Pasar la tabla HTML al método printJS
      type: 'html',
      style: `
    @page { 
      size: letter; 
      margin: 50px; 
    }
    /* Aquí puedes agregar tus estilos personalizados */
    .bis{
      align-items: center;
      color: #000000;
      font-size: 20px;
    }
    h1{
      margin-top:8%;
      text-align: center;
      color: #000000;
      font-size: 40px;
    }
    .tabla{
      border: 1px solid rgb(12, 12, 12);
      text-align: center;
    }
    .tabla {
      margin-top: 20px;
      width: 100%;
      border-collapse: collapse;
      text-align: center; /* Alinea el contenido de la tabla al centro */
      border: 1px solid white;
    }
    

    .table-header {
      text-align: center;
      font-size: 10px;
      border: 1px solid rgb(12, 12, 12);
    }
    
    .table thead tr th {
      font-size: 12px;
      border: 1px solid rgb(12, 12, 12);
    }
    
    td {
      border: 1px solid rgb(12, 12, 12);
    }
  `,  
      targetStyles: ['border', 'padding', 'color', 'font-size'] 
    });
}



  // Método para cambiar el estado de una asistencia
  cambiarEstadoAsistencia(id: number, estado: string) {
    this.asistenciaService.cambiarEstadoAsistencia(id, estado, this.token).subscribe(
      () => {
        console.log('Estado de la asistencia cambiado correctamente.');
        this.listarAsistencias(); // Recargar la lista de asistencias después de cambiar el estado
      },
      error => console.error('Error al cambiar estado de la asistencia:', error)
    );
  }
  buscarAsistencia(): void {
    this.asistenciaService.buscarPorCiOFecha(this.ciBusqueda, this.fechaBusqueda,this.token)
      .subscribe(asistencias => {
        this.asistencias = asistencias;
      }, error => {
        console.error('Error al buscar asistencias:', error);
      });
  }
  
}

