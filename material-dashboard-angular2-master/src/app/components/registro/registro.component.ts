import { Component, OnInit } from '@angular/core';
import { Usuario } from 'models/usuario.model';
import { NgForm} from "@angular/forms"
import {  RegistroService } from 'services/registro.service';

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
    this.usuarioService.obtenerUsuario()
      .subscribe(usuarios => this.usuarios = this.usuarios);
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
          // Aquí podrías mostrar un mensaje al usuario o intentar la solicitud nuevamente.
        }
      });
      
      this.usuarioService.getRoles().subscribe({
        next: (roles) => {
          this.roles = roles;
        },
        error: (error) => {
          console.error('Error al cargar los roles', error);
          // Manejo de errores similar al anterior.
        }
      });
      
      this.usuarioService.registrarUsuario(this.nuevoUsuario)
        .subscribe(usuario => {
          this.usuarios.push(usuario);
          this.nuevoUsuario = new Usuario(0, '', '', '', '','','','',0,0);
          form.reset();
        });
    }
  }
  editarUsuario(usuario: Usuario): void {
    this.editandoUsuario = { ...usuario };
  }

  actualizarAnticipo(): void {
    if (this.editandoUsuario) {
      this.usuarioService.actualizarUsuario(this.editandoUsuario)
        .subscribe(usuario => {
          const index = this.usuarios.findIndex(a => a.id_usuario === usuario.id_usuario);
          this.usuarios[index] = usuario;
          this.editandoUsuario = null;
        });
    }
  }

  cambiarEstadoAnticipo(idUsuario: number, estado: string): void {
    this.usuarioService.cambiarEstadoUsuario(idUsuario, estado)
      .subscribe(() => {
        this.usuarios = this.usuarios.filter(a => a.id_usuario !== idUsuario);
      });
  }
  buscarUsuarioPorCi(ci: string): void {
    this.usuarioService.buscarPorCi(ci)
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios; 
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
        }
      });
  }

}