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
  public login :any;
  constructor(private loginService: LoginService,
    private _router : Router
    ) {
    this.login = new Login(0, '', '', '', '', '', 0);
  }
  
  ngOnInit(): void {
  }
  login1() {

    this.loginService.login( 
      this.email,
      this.password
    ).subscribe(response => {
      console.log('Ingreso Exitoso: ', response);
      this._router.navigate(['dashboard'])
    }, error => {
      console.error('Ingreso Fallido: ', error);
    });
  }
}
