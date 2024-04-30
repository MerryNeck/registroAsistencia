import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import { Login } from 'models/login.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegistroService } from 'services/registro.service';
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
  rutaRol:string='';
  public res: any;
  public perfilUser: any;
  public perfildata:any;
  public users: any[]=[];
 
  constructor(
    private loginService: LoginService, 
    private usuarioService: RegistroService,
    private router: Router) { 
    this.token = localStorage.getItem('token') || ''
    this.rutaRol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutaRol === ''){
      this.router.navigate(['/login'])
    }else if(this.rutaRol !== 'admin' ){
      this.router.navigate(['/asistencia'])
    }else{
      this.obtenerPerfiles();
    }}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuario(this.token, this.rutaRol).subscribe(
      (response: any) => {
        if (response.ok) {
          console.log("Respuesta del servicio de usuarios:", response);
          this.users = response.data;
          console.log(this.users);
        }
      },
      (error) => {
        console.error("Error al cargar las usuarios", error);
        (error) =>
          Swal.fire("Error", "No se pudo registrar el usuario", "error");
      },
    );
    console.log("usuarios",this.usuarioService.obtenerUsuario);
    this.obtenerPerfiles();  
    
  }
  obtenerPerfiles(): void {
    this.loginService.obtenerPerfil(this.token,this.rutaRol)
      .subscribe((response : any) => {
        if (response.ok) {
          this.perfilUser = response.data;
          console.log(this.perfilUser);
          
        } else {

          error => Swal.fire('Error', 'No se pudieron obtener la autentificacion', 'error')
        }

      });
  }
  registrarNuevoPerfil(form: NgForm): void {
    
    
    if (form.valid) {
      console.log("nuevo",form.value);
      const { correo_corp, password, ci } = form.value;
      this.nuevoPerfil.id_usuario = ci;
      this.nuevoPerfil.correo_corp = correo_corp;
      this.nuevoPerfil.password = password;
      this.loginService.registrarPerfil(this.nuevoPerfil, this.token,this.rutaRol)
        .subscribe((response:any) => {
          this.perfildata = response.data
          this.perfiles.push(this.perfildata);
          this.nuevoPerfil = new Login(0, '', '', '', '', '', 0);
        this.obtenerPerfiles();
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

    this.loginService.cambiarEstadoPerfil(idPerfil, nuevoEstado, this.token,this.rutaRol).subscribe(
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
    this.loginService.buscarPorCi(ci, this.token,this.rutaRol)
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
