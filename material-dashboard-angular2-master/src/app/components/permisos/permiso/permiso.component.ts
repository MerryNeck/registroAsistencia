import { Component, OnInit } from '@angular/core';
import { Permiso } from 'models/permiso.modelo';
import { PermisoService } from 'services/permiso.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css']
})
export class PermisoComponent implements OnInit {

  ciBusqueda: string = '';
  fechaBusqueda: string = '';
  permisos: Permiso[] = [];
  nuevoPermiso: Permiso = new Permiso(0, '', '', '', 0, '', '', '');
  editandoPermiso: Permiso | null = null;
  token: string = '';
  estado: string;
  public res: any;
  public users: any;
  public userdata:any;
  constructor(private permisoService: PermisoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPermisos();
    this.token = localStorage.getItem('token') || ''
  }

  obtenerPermisos(): void {
    this.permisoService.obtenerPermiso(this.token)
      .subscribe((response) => {
        this.res = response
        if (this.res.ok) {
          this.users = this.res.data;
          console.log(this.users);
        } else {
          error => Swal.fire('Error', 'No se pudieron obtener los permisos', 'error')
        }

      });

  }
  registrarNuevoPermiso(form: NgForm): void {
    if (form.valid) {
      const { ci, min_permiso, detalle } = form.value;
      this.nuevoPermiso.id_usuario = ci;
      this.nuevoPermiso.min_permiso = min_permiso;
      this.nuevoPermiso.detalle = detalle;
      this.permisoService.registrarPermiso(this.nuevoPermiso, this.token)
        .subscribe((response :any) => {
          this.userdata = response.data
          this.permisos.push(this.userdata);
          this.nuevoPermiso = new Permiso(0, '', '', '', 0, '', '', '');
          form.reset();
          Swal.fire('Éxito', 'El permiso fue registrado correctamente', 'success');
        },
          error => Swal.fire('Error', 'No se pudo registrar el permiso', 'error')
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

  editarPermiso(permiso: Permiso): void {
    this.router.navigate(['/editar-permiso', permiso.id_permiso]);

  }


  buscarAnticipoPorCi(ci: string): void {
    this.permisoService.buscarPorCi(ci, this.token)
      .subscribe({
        next: (permisos) => {
          this.permisos = permisos;
        },
        error: (error) => {
          console.error('Error al buscar permisos por CI', error);
          Swal.fire('Error', 'Ingrese de nuevos los datos', 'error');
        }
      });
  }
  cambiarEstadoPermiso(idPermiso: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;
    this.permisoService.cambiarEstadoPermiso(idPermiso, nuevoEstado, this.token).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: `Estado del permiso actualizado correctamente a ${this.estado === 's' ? 'activado' : 'desactivado'}.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.obtenerPermisos();
          }
        });
      },
      error: (error) => {
        console.error('Error al cambiar el estado:', error);
        this.estado = estadoAnterior;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cambiar el estado del permiso',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });

  }

}
