import { Component, OnInit } from '@angular/core';
import { Permiso } from 'models/permiso.modelo';
import { PermisoService } from 'services/permiso.service';
import { AuthService } from 'services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css']
})
export class PermisoComponent implements OnInit {

  ciBusqueda: string = '';
  fechaBusqueda: string = '';
 permisos:Permiso[] =[];
 nuevoPermiso: Permiso = new Permiso(0, '', '', '', 0, '','','');
 editandoPermiso: Permiso | null = null;

 info=[{
      id_permiso : 1,
      id_usuario: 2,
      fecha: 100,
      min_permiso: 480,
      estado : 's',
      fecha_creacion: '20240301' ,
      fecha_modificacion: '' ,
 },{
  id_permiso :2,
      id_usuario: 2,
      fecha: 100,
      min_permiso: 480,
      estado : 's',
      fecha_creacion: '20240301' ,
      fecha_modificacion: '' ,
}]

  constructor(private permisoService: PermisoService) { }

  ngOnInit(): void {
    this.obtenerPermisos( );

  }

  obtenerPermisos(): void {
    this.permisoService.obtenerPermiso()
      .subscribe(permisos => this.permisos = permisos);
      
  }
  registrarNuevoPermiso(form:NgForm): void {
    if (form.valid) {
      const { ci, min_permiso,detalle } = form.value;
      this.nuevoPermiso.id_usuario = ci;
      this.nuevoPermiso.min_permiso = min_permiso;
      this.nuevoPermiso.detalle = detalle;
      this.permisoService.registrarPermiso(this.nuevoPermiso)
        .subscribe(permiso => {
          this.permisos.push(permiso);
          this.nuevoPermiso = new Permiso(0, '', '', '', 0, '','','');
          form.reset();
        });
    }
  }
  editarPermiso(permiso: Permiso): void {
    this.editandoPermiso = { ...permiso };
  }

  actualizarAnticipo(): void {
    if (this.editandoPermiso) {
      this.permisoService.actualizarPermiso(this.editandoPermiso)
        .subscribe(permiso => {
          const index = this.permisos.findIndex(a => a.id_permiso === permiso.permisos);
          this.permisos[index] = permiso;
          this.editandoPermiso = null;
        });
    }
  }

  cambiarEstadoAnticipo(idPermiso: number, estado: string): void {
    this.permisoService.cambiarEstadoPermiso(idPermiso, estado)
      .subscribe(() => {
        this.permisos = this.permisos.filter(a => a.id_permiso !== idPermiso);
      });
  }
  buscarAnticipoPorCi(ci: string): void {
    this.permisoService.buscarPorCi(ci)
      .subscribe({
        next: (permisos) => {
          this.permisos = permisos; 
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
        }
      });
  }

}
