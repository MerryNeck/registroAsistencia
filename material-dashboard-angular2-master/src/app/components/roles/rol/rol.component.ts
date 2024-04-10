import { Component, OnInit } from '@angular/core';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
import { AuthService } from 'services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  nuevoRol: Rol = new Rol(0, '', '', '', '');
  roles: Rol[] = [];
  editandoRol: Rol | null =null;
  token: string = '';

  rol=[{
    id_rol : 1,
    tipo: 'rrhh',
    fecha_creacion:'20240301',
    estado : 's',
    fecha_modificacion: ''
},{
  id_rol : 2,
  tipo: 'administracion',
  fecha_creacion:'20240301',
  estado : 's',
  fecha_modificacion: ''
},{
  id_rol : 3,
  tipo: 'desarrollo',
  fecha_creacion:'20240301',
  estado : 's',
  fecha_modificacion: ''
}]

  constructor(private rolService: RolService, private authService:AuthService) { }

  ngOnInit(): void {
    this.listarRoles();
    this.token = localStorage.getItem('token') || ''
  }
  listarRoles(): void {
    this.rolService.listarRol().subscribe(
      (roles) => (this.roles = roles),
      error => Swal.fire('Error', 'No se pudieron obtener los rol', 'error')
      
    );
  }

  registrarNuevoRol(form:NgForm): void {
    if (form.valid) {
      const { tipo, estado } = form.value;
      this.nuevoRol.tipo = tipo;
      this.nuevoRol.estado = estado;
      this.rolService.registrarRol(this.nuevoRol,this.token)
        .subscribe(rol=> {
          this.roles.push(rol);
          this.nuevoRol = new Rol(0, '', '', '', '');
          form.reset();
        });
    }
  }

  editarRol(rol: Rol): void {
    this.editandoRol = { ...rol };
  }

  cambiarEstadoRol(idRol: number, nuevoEstado: string) {
    this.rolService.cambiarEstadoRol(idRol, nuevoEstado, this.token).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Estado del rol actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.listarRoles();
          }
        });
      },
      error: (error) => {
        console.error('Error al cambiar el estado:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cambiar el estado del rol.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });

  }

}
