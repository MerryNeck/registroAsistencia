import { Component, OnInit } from '@angular/core';
import { Permiso } from 'models/permiso.modelo';
import { PermisoService } from 'services/permiso.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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
 token: string = '';

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
    this.token = localStorage.getItem('token') || ''
  }

  obtenerPermisos(): void {
    this.permisoService.obtenerPermiso(this.token)
      .subscribe(permisos => this.permisos = permisos,
        error => Swal.fire('Error', 'No se pudieron obtener los permisos', 'error')
      );
      
  }
  registrarNuevoPermiso(form:NgForm): void {
    if (form.valid) {
      const { ci, min_permiso,detalle } = form.value;
      this.nuevoPermiso.id_usuario = ci;
      this.nuevoPermiso.min_permiso = min_permiso;
      this.nuevoPermiso.detalle = detalle;
      this.permisoService.registrarPermiso(this.nuevoPermiso,this.token)
        .subscribe(permiso => {
          this.permisos.push(permiso);
          this.nuevoPermiso = new Permiso(0, '', '', '', 0, '','','');
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
    this.editandoPermiso = { ...permiso };
  }

 
  buscarAnticipoPorCi(ci: string): void {
    this.permisoService.buscarPorCi(ci,this.token)
      .subscribe({
        next: (permisos) => {
          this.permisos = permisos; 
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
          Swal.fire('Error', 'No se pudieron buscar los permisos', 'error');
        }
      });
  }

}
