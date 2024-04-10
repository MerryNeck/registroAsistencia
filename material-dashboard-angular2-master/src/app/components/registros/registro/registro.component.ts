import { Component, OnInit } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { NgForm} from "@angular/forms"
import {  RegistroService } from 'services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  
})
export class RegistroComponent implements OnInit{
  ciBusqueda: string = '';
  usuarios:Usuario[] =[];
 nuevoUsuario: Usuario = new Usuario(0, '', '', '', '','','','',0,0);
 editandoUsuario: Usuario | null = null;
 areas: any[] = []; 
 roles: any[] =[];
 token:string = '';
 usuarios1=[{
  id_usuario : 1,
  ci:'13276634',
  nombre: 'miriam',
  apellido_paterno: 'justo',
  apellido_materno : 'mamani',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '',
  estado:'s',
  
},{
  id_usuario : 2,
  ci:'13276634',
  nombre: 'miriam',
  apellido_paterno: 'justo',
  apellido_materno : 'mamani',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '',
  estado:'s',
},{
  id_usuario : 3,
  ci:'13276634',
  nombre: 'miriam',
  apellido_paterno: 'justo',
  apellido_materno : 'mamani',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '',
  estado:'s',
}]
constructor(private usuarioService: RegistroService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();

  }
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuario(this.token)
      .subscribe(usuarios => this.usuarios = this.usuarios,
        error => Swal.fire('Error', 'No se pudieron obtener los usuarios', 'error')
      );
  }
  registrarNuevoUsuario(form:NgForm): void {
    if (form.valid) {
      const { ci,nombre, apellido_materno,apellido_paterno,estado } = form.value;
      this.nuevoUsuario.ci = ci;
      this.nuevoUsuario.nombre = nombre;
      this.nuevoUsuario.apellido_paterno = apellido_paterno;
      this.nuevoUsuario.apellido_materno = apellido_materno;
      this.nuevoUsuario.estado = estado;
      this.usuarioService.getAreas().subscribe({
        next: (areas) => {
          this.areas = areas;
        },
        error: (error) => {
          console.error('Error al cargar las áreas', error);
          error => Swal.fire('Error', 'No se pudo registrar el area', 'error')
          }
      });
      
      this.usuarioService.getRoles().subscribe({
        next: (roles) => {
          this.roles = roles;
        },
        error: (error) => {
          console.error('Error al cargar los roles', error);
          error => Swal.fire('Error', 'No se pudo registrar el area', 'error')
        }
      });
      
      this.usuarioService.registrarUsuario(this.nuevoUsuario,this.token)
        .subscribe(usuario => {
          this.usuarios.push(usuario);
          this.nuevoUsuario = new Usuario(0, '', '', '', '','','','',0,0);
          form.reset();
          Swal.fire('Éxito', 'El usuario fue registrado correctamente', 'success');
        },
        error => Swal.fire('Error', 'No se pudo registrar el usuario', 'error')
      );
  } else {
    Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
  }
}
  editarUsuario(usuario: Usuario): void {
    this.editandoUsuario = { ...usuario };
  }

  
  buscarUsuarioPorCi(ci: string): void {
    this.usuarioService.buscarPorCi(ci,this.token)
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios; 
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error),
          Swal.fire('Error', 'No se pudo buscar el usuario', 'error');

        }
      });
  }
 
  cambiarEstadoRegistro(idUsuario: number, nuevoEstado: string) {
    this.usuarioService.cambiarEstadoUsuario(idUsuario, nuevoEstado, this.token).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Estado del usuario actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.obtenerUsuarios();
          }
        });
      },
      error: (error) => {
        console.error('Error al cambiar el estado:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cambiar el estado del usuario.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });

  }

}