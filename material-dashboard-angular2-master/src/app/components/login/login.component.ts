import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private loginService: LoginService,
    private _router : Router
    ) {
    
  }
  
  ngOnInit(): void {}
  login() {
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
