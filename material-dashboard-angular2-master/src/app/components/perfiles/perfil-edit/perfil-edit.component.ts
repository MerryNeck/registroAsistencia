import { Component, OnInit } from '@angular/core';
import { Login } from 'models/login.model';
import { LoginService } from 'services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {

  editandoperfil: Login = {id:0, correo_corp: '', password: '', id_usuario:0,estado:'',fecha_creacion: '', fecha_modificacion: '' };
  token: string = '';
  rutarol:string='';
  public res: any;
  public user:any[]=[]

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.rutarol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutarol === ''){
      this.router.navigate(['/login']);
    }else if(this.rutarol !== 'admin'){
      this.router.navigate(['/asistencia']);
    }else{
      this.route.params.subscribe(params => {
        const idPerfil = +params['id'];
        this.obtenerPerfil(idPerfil);
      });
    }
    
  }

  obtenerPerfil(idPerfil: number): void {
    this.loginService.obtenerPerfilPorId(idPerfil, this.token, this.rutarol)
      .subscribe(
        (response: any) => {
          
          this.editandoperfil = response.data;
        },
        error => {
          console.error('Error al obtener el usuario o contraseña:', error);
          Swal.fire('Error', 'No se pudo obtener el usuario o contraseña', 'error');
        }
      );
  }

  actualizarPerfiles(form: NgForm): void {
    if (this.editandoperfil !== null) {
      this.loginService.actualizarPerfil(this.editandoperfil, this.token,this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', ' se actualizó correctamente', 'success');
            this.router.navigate(['/perfil']);
          },
          error => {
            console.error('Error al actualizar el usuario usuario o contraseña:', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario usuario o contraseña', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
