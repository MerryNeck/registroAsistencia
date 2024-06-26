import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import { Login } from 'models/login.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  token:string='';

  public usuario : any
  public url
  constructor(private loginService: LoginService,private _router : Router)
  {
    this.usuario =  new Login( 0,'','','','','',0)
  }
  
  ngOnInit(
   
  ): void {
    
    this.token = localStorage.getItem('token') || '';
    if(this.token !== ''){
      this._router.navigate(['/asistencia']);
    }
  }
   
  login(loginForm): void {
    console.log(this.usuario);
    if (!this.usuario.email || !this.usuario.password ) {
      Swal.fire({
        icon: 'error',
        title: 'Lo Siento',
        text: 'Por favor, completa todos los campos!',
      });
      return;
    }

   this.loginService.login(this.usuario.email, this.usuario.password).subscribe(
      (response: any) => {
        console.log('Ingreso Exitoso: ', response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        this._router.navigate(['/asistencia']);
      },
      (error) => {
        console.error('Ingreso Fallido: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
        });
      }
    );
  }
}