import { Component, OnInit } from '@angular/core';
import { Area }from "models/area.model";
import { Rol } from 'models/rol.model';
import {FormGroup, FormsModule,FormControl} from "@angular/forms"
import {  RegistroService } from 'services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  
})
export class RegistroComponent implements OnInit{

  usuarioForm: FormGroup;
  areas: Area[] = [];
  roles: Rol[] = [];
  error: string;
  selectedArea: Area; 
  selectedRol: Rol;
  constructor(private usuarioService: RegistroService) {}

 ngOnInit() {
  //const modalRef = this.modalService.open(this.modalMensaje);
    /*this.usuarioForm = new FormGroup({
      nombre: new FormControl(''),
      apellido_paterno: new FormControl(''),
      apellido_materno: new FormControl(''),
      ci: new FormControl(''),
      idArea: new FormControl(null),
      idRol: new FormControl(null)
    })*/

    this.usuarioService.getAreas().subscribe(areas => {
      this.areas = areas;
    });

    this.usuarioService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  onSubmit() {
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