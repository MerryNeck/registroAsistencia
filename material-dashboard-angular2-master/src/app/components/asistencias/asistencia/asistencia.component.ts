import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'models/asistencia.model';
import { AsistenciaService } from 'services/asistencia.service';
import { HttpClient } from '@angular/common/http';
import * as printJS from 'print-js';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  token: string = '';
  public res: any;
  public asistenciasUser: any;
  rutaRol: string = '';


  constructor(private asistenciaService: AsistenciaService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.rutaRol = localStorage.getItem('rol') || '';
    if (this.token === '' ) {
      this.router.navigate(['/login'])
    }  else {
      this.listarAsistencias();
    }

  }

  listarAsistencias(): void {
    this.asistenciaService.getAsistencias(this.token).subscribe((response) => {
      //console.log(response);
      this.res = response
      if (this.res.ok) {
        this.asistenciasUser = this.res.data;
        console.log(this.asistenciasUser);
      } else {
      }
      error => Swal.fire('Error', 'No se pudieron obtener los datos de asistencia', 'error')
    });
  }

  seleccionarAsistencia(asistencia: Asistencia): void {
    if(
      this.rutaRol ==='admin'
    ){
      this.router.navigate(['/editar-asistencia', asistencia.id_asistencia]);
    }
    
  }
  imprimirAsistencia(): void {
    if(this.rutaRol ==='admin'){

    
    if (this.fechaBusqueda && this.ciBusqueda) {
      if (this.asistenciasUser && this.asistenciasUser.length > 0) {
        const filasHTML: string[] = [];
        this.asistencias.forEach(asistenciasUser => {
          let filaHTML = '<tr>';

          // Índices de las columnas que deseas imprimir
          const columnasImprimir = ['fecha', 'id_usuario', 'apellido', 'tprano_ingreso', 'tprano_salida',
            'tde_ingreso', 'tde_salida', 'min_retardados', 'min_extra', 'faltas', 'total_horas', 'id_permiso', 'hrs_no_recuperadas'
          ];

          columnasImprimir.forEach(columna => {
            filaHTML += `<td>${asistenciasUser[columna]}</td>`;
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
      margin-top: -20px;
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
      } else {
        Swal.fire('Error', 'No hay datos para imprimir el reporte.', 'error');
      }
    }
  }else{
    if (this.fechaBusqueda) {
      if (this.asistenciasUser && this.asistenciasUser.length > 0) {
        const filasHTML: string[] = [];
        this.asistencias.forEach(asistenciasUser => {
          let filaHTML = '<tr>';

          // Índices de las columnas que deseas imprimir
          const columnasImprimir = ['fecha', 'id_usuario', 'apellido', 'tprano_ingreso', 'tprano_salida',
            'tde_ingreso', 'tde_salida', 'min_retardados', 'min_extra', 'faltas', 'total_horas', 'id_permiso', 'hrs_no_recuperadas'
          ];

          columnasImprimir.forEach(columna => {
            filaHTML += `<td>${asistenciasUser[columna]}</td>`;
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
      margin-top: -20px;
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
      } else {
        Swal.fire('Error', 'No hay datos para imprimir el reporte.', 'error');
      }
    }
  }
  }

  buscarAsistencia(): void {
    this.asistenciaService.buscarPorCiOFecha(this.ciBusqueda, this.fechaBusqueda, this.token, this.rutaRol)
      .subscribe((response) => {
        this.res = response
        this.asistenciasUser = this.res.data;
        console.log(this.asistenciasUser);

      }, error => {
        console.error('Error al buscar asistencias:', error);
        Swal.fire('Error', 'Ingrese los Datos Correctos', 'error');

      });
  }

  verBoleta(): void {

    if(
      this.rutaRol ==='admin'
    ){
    this.router.navigate(['/boleta']);

    }
  }

}
