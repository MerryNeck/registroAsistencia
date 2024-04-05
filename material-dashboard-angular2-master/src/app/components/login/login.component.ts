import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import { Login } from 'models/login.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  public usuario : any
  constructor(private loginService: LoginService,
    private _router : Router
    ) {
      this.usuario= new Login(0,'','','','','',0)
  }
  
  ngOnInit(): void {}
   
  login(loginForm:any) {
    console.log(this.usuario);
    console.log(this.email);
    
    
    console.log("ël boton funciona");
    
    this.loginService.login( 
      this.email,
      this.password
    ).subscribe((response:any )=> {
      console.log('Ingreso Exitoso: ', response);
      //localStorage.setItem('token', response.token);
      this._router.navigate(['rolArea'])
    }, error => {
      console.error('Ingreso Fallido: ', error);
    });
  }
}
