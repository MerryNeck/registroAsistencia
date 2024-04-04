import { Component, OnInit } from '@angular/core';
import { Area }from "models/area.model";
import { Rol } from 'models/rol.model';
import { Usuario } from 'models/usuario.model';
import {FormGroup, FormsModule,FormControl, Validators, NgForm} from "@angular/forms"
import {  RegistroService } from 'services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  
})
export class RegistroComponent implements OnInit{
 /* usuarioForm: FormGroup;
  areas: Area[] = [];
  roles: Rol[] = [];
  error: string;
  selectedArea: Area; 
  selectedRol: Rol;
  usuarios:Usuario[] =[];
 nuevoUsuario: Usuario= new Usuario(0, '', '', '','', '', '');
 editandoUsuario: Usuario| null = null;

  usuario=[{
    id_area: 1,
    tipo_area: 'admin',
},{
  id_area: 2,
  tipo_area: 'admin',
},{
  id_area: 3,
  tipo_area: 'administracion',
}]
  constructor(private usuarioService: RegistroService) {}

 ngOnInit():void {}
   /* RegistrarNuevoUsuario(form:NgForm):void{
      if (form.valid) {
        const { ci, anticipo } = form.value;
        this.nuevoUsuario.id_usuario = ci;
        this.nuevoUsuario.anticipos = anticipo;
        this.usuarioService.registra(this.nuevoAnticipo)
          .subscribe(anticipo => {
            this.anticipos.push(anticipo);
            this.nuevoAnticipo = new Anticipo(0, '', '', '', 0, 0);
            this.usuarioService.getAreas().subscribe({
              next: (areas) => {
                this.areas = areas;
              },
              error: (error) => {
                console.error('Error al cargar las áreas', error);
                
              }
            });
            this.usuarioService.getRoles().subscribe({
              next: (roles) => {
                this.roles = roles;
              },
              error: (error) => {
                console.error('Error al cargar los roles', error);
        
                }
               
            });
            form.reset();
          });
      }
    }
    


  insertarUsuario() {
    const usuario = this.usuarioForm.value;
    this.usuarioService.insertUsuario(usuario).subscribe(() => {
      // Usuario registrado correctamente
      this.usuarioForm.reset();
      this.error = null;
    }, error => {
      this.error = error.message;
    });
  }*/
}