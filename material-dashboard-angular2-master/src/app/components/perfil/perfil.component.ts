import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import { Login } from 'models/login.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfiles:Login[] =[];
 nuevoPerfil: Login = new Login(0, '', '', '','', '', 0);
 editandoPerfil: Login | null = null;

 perfil=[{
  id : 1,
  nombre: 'miriam',
  apellido: 'justo',
  correo_corp: 'liliansonia77@gmail.com',
  password: '12345',
  estado : 's',
  fecha_creacion: '20240301' ,
  fecha_nodificacion: '20240301' ,
},{
  id : 2,
  nombre: 'miriam',
  apellido: 'justo',
  correo_corp: 'liliansonia77@gmail.com',
  password: '123456',
  estado : 'n',
  fecha_creacion: '20240301' ,
  fecha_nodificacion: '20240301' ,
},{
  id : 3,
  nombre: 'miriam',
  apellido: 'justo',
  correo_corp: 'liliansonia77@gmail.com',
  password: '123457',
  estado : 's',
  fecha_creacion: '20240301' ,
  fecha_nodificacion: '20240301' ,
}]
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerPerfiles();
  }
  obtenerPerfiles(): void {
    this.loginService.obtenerPerfil()
      .subscribe(perfiles => this.perfiles = perfiles);
  }
  registrarNuevoPerfil(form:NgForm): void {
    if (form.valid) {
      const { correo,password,fecha_creacion,estado} = form.value;
      this.nuevoPerfil.correo_corp = correo;
      this.nuevoPerfil.password = password;
      this.nuevoPerfil.fecha_creacion = fecha_creacion;
      this.nuevoPerfil.estado = estado;
      this.loginService.registrarPerfil(this.nuevoPerfil)
        .subscribe(perfil => {
          this.perfiles.push(perfil);
          this.nuevoPerfil = new Login(0, '', '', '','', '', 0);
          form.reset();
        });
    }
  }
  editarPerfiles(perfil:Login): void {
    this.editandoPerfil = { ...perfil };
  }

  actualizarPerfiles(): void {
    if (this.editandoPerfil) {
      this.loginService.actualizarPerfil(this.editandoPerfil)
        .subscribe(perfil => {
          const index = this.perfiles.findIndex(a => a.id=== perfil.perfiles);
          this.perfiles[index] = perfil;
          this.editandoPerfil = null;
        });
    }
  }
  cambiarEstadoPerfil(idPerfil: number, estado: string): void {
    this.loginService.cambiarEstadoPerfil(idPerfil, estado)
      .subscribe(() => {
        this.perfiles = this.perfiles.filter(a => a.id !== idPerfil);
      });
  }
}
