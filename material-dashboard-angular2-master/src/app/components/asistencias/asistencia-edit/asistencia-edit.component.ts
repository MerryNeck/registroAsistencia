import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'models/asistencia.model';
import { AsistenciaService } from 'services/asistencia.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-asistencia-edit',
  templateUrl: './asistencia-edit.component.html',
  styleUrls: ['./asistencia-edit.component.css']
})
export class AsistenciaEditComponent implements OnInit {

  editandoAsistencia: any;
  token: string = '';
  public res: any;
  rutarol:string='';

  constructor(
    private asistenciaService: AsistenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.rutarol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutarol === ''){
      this.router.navigate(['/login']);
    }else if(this.rutarol !== 'admin'){
      this.router.navigate(['/asistencia']);
    }
    else{
      this.route.params.subscribe(params => {
        const idAsistencia = +params['id'];
        this.obtenerAsistencia(idAsistencia);
      });
    }
    
  }

  obtenerAsistencia(idAsistencia: number): void {
    this.asistenciaService.obtenerAsistenciaPorId(idAsistencia, this.token, this.rutarol)
      .subscribe(
        asistencia => {
          this.res = asistencia
          this.editandoAsistencia =this.res.data;
          console.log(this.editandoAsistencia);
          
        },
        error => {
          console.error('Error al obtener el asistencia:', error);
          Swal.fire('Error', 'No se pudo obtener el asistencia', 'error');
        }
      );
  }

  actualizarAsistencia(form: NgForm): void {
    if (this.editandoAsistencia) {
      this.asistenciaService.actualizarAsistencia(this.editandoAsistencia, this.token, this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'La asistencia se actualizó correctamente', 'success');
            this.router.navigate(['/asistencia']);
          },
          error => {
            console.error('Error al actualizar la asistencia:', error);
            Swal.fire('Error', 'No se pudo actualizar el asistencia', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
