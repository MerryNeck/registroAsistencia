import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from "rxjs";//
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { Area }from "models/area.model";
import { Rol } from 'models/rol.model';
import {FormGroup, FormsModule,FormControl} from "@angular/forms"
import { RegistroService } from 'services/registro.service';

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
  constructor(private registroService: RegistroService) {}

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

    this.registroService.getAreas().subscribe(areas => {
      this.areas = areas;
    });

    this.registroService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  onSubmit() {
    const usuario = this.usuarioForm.value;
    this.registroService.insertUsuario(usuario).subscribe(() => {
      // Usuario registrado correctamente
      this.usuarioForm.reset();
      this.error = null;
    }, error => {
      this.error = error.message;
    });
  }
}