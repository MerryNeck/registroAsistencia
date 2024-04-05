import { Component, OnInit } from '@angular/core';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
import { AuthService } from 'services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  nuevoRol: Rol = new Rol(0, '', '', '', '');
  roles: Rol[] = [];
  editandoRol: Rol | null =null;


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

  }
  listarRoles(): void {
    this.rolService.listarRol().subscribe(
      (roles) => (this.roles = roles),
      (error) => console.error('Error al obtener roles:', error)
    );
  }

  registrarNuevoRol(form:NgForm): void {
    if (form.valid) {
      const { tipo, estado } = form.value;
      this.nuevoRol.tipo = tipo;
      this.nuevoRol.estado = estado;
      this.rolService.registrarRol(this.nuevoRol)
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

  actualizarRol(valores: any): void {
    if (this.editandoRol) {
      this.rolService.actualizarRol(this.editandoRol).subscribe(
        (rol) => {
          const index = this.roles.findIndex(
            (r) => r.id_rol === rol.id_rol
          );
          this.roles[index] = rol;
          this.editandoRol = null;
        },
        (error) => console.error('Error al actualizar rol:', error)
      );
    }
  }

  cambiarEstadoRol(idRol: number, estado: string): void {
    this.rolService.cambiarEstadoRol(idRol, estado).subscribe(
      (response) => {
        console.log('Estado del rol cambiado:', response);
        this.listarRoles();
      },
      (error) =>
        console.error('Error al cambiar estado del rol:', error)
    );
  }

}
