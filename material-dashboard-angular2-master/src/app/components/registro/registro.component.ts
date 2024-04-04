import { Component, OnInit } from '@angular/core';
import { Area }from "models/area.model";
import { Rol } from 'models/rol.model';
import {FormGroup, FormsModule,FormControl, Validators} from "@angular/forms"
import {  RegistroService } from 'services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  
})
export class RegistroComponent implements OnInit{

  area=[{
    id_area: 1,
    tipo_area: 'admin',
},{
  id_area: 2,
  tipo_area: 'admin',
},{
  id_area: 3,
  tipo_area: 'administracion',
}]
rol=[{
  id_rol: 1,
  tipo: 'admin',
},{
id_rol: 2,
tipo: 'tec',
},{
id_area: 3,
tipo: 'user',
}]

  usuarioForm: FormGroup;
  areas: Area[] = [];
  roles: Rol[] = [];
  error: string;
  selectedArea: Area; 
  selectedRol: Rol;
  constructor(private usuarioService: RegistroService) {}

 ngOnInit() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('',Validators.required),
      apellido_paterno: new FormControl('',Validators.required),
      apellido_materno: new FormControl('',Validators.required),
      ci: new FormControl('',Validators.required),
      idArea: new FormControl('',Validators.required),
      idRol: new FormControl('',Validators.required)
    })

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
  }
}