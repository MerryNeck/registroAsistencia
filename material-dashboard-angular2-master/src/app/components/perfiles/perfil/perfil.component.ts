import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import { Login } from 'models/login.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  ciBusqueda: string = '';
  perfiles: Login[] = [];
  nuevoPerfil: Login = new Login(0, '', '', '', '', '', 0);
  editandoPerfil: Login | null = null;
  token: string = '';
  estado: string;
  public res: any;
  public perfilUser: any;

 
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPerfiles();
  }
  obtenerPerfiles(): void {
    this.loginService.obtenerPerfil(this.token)
      .subscribe((response : any) => {
        if (response.ok) {
          this.perfilUser = response.data;
        } else {
          error => Swal.fire('Error', 'No se pudieron obtener la autentificacion', 'error')
        }

      });
  }
  registrarNuevoPerfil(form: NgForm): void {
    if (form.valid) {
      const { correo, password, fecha_creacion, estado } = form.value;
      this.nuevoPerfil.correo_corp = correo;
      this.nuevoPerfil.password = password;
      this.nuevoPerfil.fecha_creacion = fecha_creacion;
      this.nuevoPerfil.estado = estado;
      this.loginService.registrarPerfil(this.nuevoPerfil, this.token)
        .subscribe(perfil => {
          this.perfiles.push(perfil);
          this.nuevoPerfil = new Login(0, '', '', '', '', '', 0);
          form.reset();
          Swal.fire('Éxito', 'La autentificacion a sido registrado correctamente', 'success');
        },
          error => Swal.fire('Error', 'No se pudo registrar ', 'error')
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }
  cambiarEstadoPerfil(idPerfil: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;

    this.loginService.cambiarEstadoPerfil(idPerfil, nuevoEstado, this.token).subscribe(
       (response) => {
        this.res = response;
        this.estado = this.res.data;
        Swal.fire({
          title: '¡Éxito!',
          text: `Estado de la autentificacion actualizado correctamente a ${this.estado === 's' ? 'activado' : 'desactivado'}.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.obtenerPerfiles();
          }
        });
      },(error) => {
        console.error('Error al cambiar el estado:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cambiar el estado de la autentificacion',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );

  }
  editarPerfil(perfil: Login): void {
    this.router.navigate(['/editar-perfil', perfil.id]);
  }
  buscarPerfilPorCi(ci: string): void {
    this.loginService.buscarPorCi(ci, this.token)
      .subscribe({
        next: (response) => {
          this.res = response;
          this.perfilUser = this.res.data
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
          Swal.fire('Error', 'Ingrese de nuevo los datos', 'error');
        }
      });
  }
}
