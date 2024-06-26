import { Component, OnInit } from '@angular/core';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
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
  rutaRol:string='';
  
  public res: any;
  public rolUser : any;

  constructor(private rolService: RolService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.rutaRol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutaRol === ''){
      this.router.navigate(['/login'])
    }else if(this.rutaRol !== 'admin' ){
      this.router.navigate(['/asistencia'])
    }else{
      this.listarRoles();
      
    }

  }
  listarRoles(): void {
    this.rolService.listarRol(this.token,this.rutaRol).subscribe ((response :any) =>{
   if (response.ok) {
     this.rolUser = response.data;
     console.log(this.rolUser);
   } else {
   }
      error => Swal.fire('Error', 'No se pudieron obtener los rol', 'error')
      
    });
  }

  registrarNuevoRol(form:NgForm): void {
    if (form.valid) {
      console.log(form.value);
      
      const { rol } = form.value;
      
      this.nuevoRol.tipo = rol;
      this.nuevoRol.estado = 's';
      this.rolService.registrarRol(this.nuevoRol,this.token,this.rutaRol)
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
  this.listarRoles();
  }

  editarRol(rol: Rol): void {
    this.router.navigate(['/editar-rol', rol.id_rol]);
    console.log(this.editandoRol);
    
  }

  cambiarEstadoRol(idRol: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;
    this.rolService.cambiarEstadoRol(idRol, nuevoEstado, this.token,this.rutaRol).subscribe(
      (response) => {
        this.res =response;
        this.estado = this.res.data;
        Swal.fire({
          title: '¡Éxito!',
          text: `Estado del rol actualizado correctamente a ${this.estado === 's' ? 'activado' : 'desactivado'}.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.listarRoles();
          }
        });
      }),(error) => {
        console.error('Error al cambiar el estado:', error);
        this.estado=estadoAnterior;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cambiar el estado del rol.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
  }

}
