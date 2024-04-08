import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import { Login } from 'models/login.model';
import { Router } from '@angular/router';
import { Usuario } from 'models/usuario.model';
import { AuthService } from 'services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  public usuario : any
  public tokens : any


  constructor(private loginService: LoginService,
    private _router : Router,
    private _authService : AuthService
    ) {
      this.usuario= new Usuario(0,'','','','','','','',0,0)
      this.tokens = _authService.getIdentity()
      this.usuario= new Login(0,'','','','','',0)
  }
  
  ngOnInit(): void {
    console.log(this.tokens);
    
    if(this.tokens){
        this._router.navigate(['excel']);

    }
    
  }
   
  login(loginForm:any) {
    console.log(this.usuario);
    console.log(this.email);
    
    
    console.log("ël boton funciona");
    
    
    this.loginService.login( 
      this.usuario.email,
      this.usuario.password
    ).subscribe((response:any )=> {
      const [tocken, rol ]=response

      console.log('Ingreso Exitoso: ', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('rol',response.rol)
      //localStorage.setItem('token', response.token);
      this._router.navigate(['excel'])
    }, error => {
      console.error('Ingreso Fallido: ', error);
      
    });
  }
}
