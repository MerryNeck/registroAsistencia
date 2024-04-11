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

  editandoAsistencia: Asistencia = {id_asistencia:0, fecha: '', id_excel:0,tprano_ingreso: '',tprano_salida:'',tde_ingreso:'',tde_salida:'',min_retardos:'',min_adelantado:'',faltas:'',total_horas:'',id_usuario:0,id_permiso:0,hrs_no_recuperadas:'',descuento:'', fecha_creacion: '', fecha_modificacion: '',estado:'' ,min_extra:''};
  token: string = '';
  public res: any;

  constructor(
    private asistenciaService: AsistenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.route.params.subscribe(params => {
      const idAsistencia = +params['id'];
      this.obtenerAsistencia(idAsistencia);
    });
  }

  obtenerAsistencia(idAsistencia: number): void {
    this.asistenciaService.obtenerAsistenciaPorId(idAsistencia, this.token)
      .subscribe(
        asistencia => {
          this.res = asistencia
          this.editandoAsistencia =this.res.asistencia;
        },
        error => {
          console.error('Error al obtener el asistencia:', error);
          Swal.fire('Error', 'No se pudo obtener el asistencia', 'error');
        }
      );
  }

  actualizarAsistencia(form: NgForm): void {
    if (form.valid && this.editandoAsistencia) {
      this.asistenciaService.actualizarAsistencia(this.editandoAsistencia, this.token)
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
