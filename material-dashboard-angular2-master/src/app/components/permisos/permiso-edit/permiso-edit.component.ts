import { Component, OnInit } from '@angular/core';
import { Permiso } from 'models/permiso.modelo';
import { PermisoService } from 'services/permiso.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-permiso-edit',
  templateUrl: './permiso-edit.component.html',
  styleUrls: ['./permiso-edit.component.css']
})
export class PermisoEditComponent implements OnInit {

  editandoPermiso: Permiso = {id_permiso:0, fecha: '',min_permiso:'',detalle:'', estado: '', fecha_creacion: '', fecha_modificacion: '' };
  token: string = '';
  rutarol:string='';

  constructor(
    private permisoService: PermisoService,
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
    }else{
      this.route.params.subscribe(params => {
      const idPermiso = +params['id'];
      this.obtenerPermiso(idPermiso);
    });
    }
    
  }

  obtenerPermiso(idPermiso: number): void {
    this.permisoService.obtenerPermisoPorId(idPermiso, this.token, this.rutarol)
      .subscribe(
        (response:any) => {
          this.editandoPermiso = response.data;
        },
        error => {
          console.error('Error al obtener el permiso:', error);
          Swal.fire('Error', 'No se pudo obtener el permiso', 'error');
        }
      );
  }

  actualizarPermiso(form: NgForm): void {
    if ( this.editandoPermiso !== null) {
      this.permisoService.actualizarPermiso(this.editandoPermiso, this.token,this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El permiso se actualizó correctamente', 'success');
            this.router.navigate(['/permiso']);
          },
          error => {
            console.error('Error al actualizar el permiso:', error);
            Swal.fire('Error', 'No se pudo actualizar el permiso', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
