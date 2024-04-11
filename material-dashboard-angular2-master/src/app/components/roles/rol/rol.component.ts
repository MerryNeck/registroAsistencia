import { Component, OnInit } from '@angular/core';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';
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
  estado: string;
  
  public res: any;
  public users : any;



 /* rol=[{
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
}]*/

  constructor(private rolService: RolService, private router:Router) { }

  ngOnInit(): void {
    this.listarRoles();
    this.token = localStorage.getItem('token') || ''
  }
  listarRoles(): void {
    this.rolService.listarRol(this.token).subscribe ((response) =>{
      this.res = response
   if (this.res.ok) {
     this.users = this.res.data;
     console.log(this.users);
   } else {
   }
      error => Swal.fire('Error', 'No se pudieron obtener los rol', 'error')
      
    });
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
          Swal.fire('Éxito', 'El rol fue registrado correctamente', 'success');
        },
        error => Swal.fire('Error', 'No se pudo registrar el rol', 'error')
      );
  } else {
    Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
  }
  }

  editarRol(rol: Rol): void {
    this.router.navigate(['/editar-rol', rol.id_rol]);
    console.log(this.editandoRol);
    
  }

  cambiarEstadoRol(idRol: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;
    this.rolService.cambiarEstadoRol(idRol, nuevoEstado, this.token).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: `Estado del rol actualizado correctamente a ${nuevoEstado === 's' ? 'activado' : 'desactivado'}.`,
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
        this.estado=estadoAnterior;
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
