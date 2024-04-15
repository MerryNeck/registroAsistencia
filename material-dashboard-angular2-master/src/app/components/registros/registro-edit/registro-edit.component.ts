import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Usuario } from 'models/usuario.model';
import { RegistroService } from 'services/registro.service';
import { Area } from 'models/area.model';
import { Rol } from 'models/rol.model';
@Component({
  selector: 'app-registro-edit',
  templateUrl: './registro-edit.component.html',
  styleUrls: ['./registro-edit.component.css']
})
export class RegistroEditComponent implements OnInit {

  //editandoUsuario: Usuario = {id_usuario:0,id_area:0,id_rol:0, nombre: '', apellido_materno:'',apellido_paterno:'',ci:'',estado: '', fecha_creacion: '', fecha_modificacion: '' };
  public editandoUsuario : any
  token: string = '';
  areas: Area[] = [];
  roles: Rol[] = [];
  public res : any;
  constructor(
    private registroService: RegistroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.route.params.subscribe(params => {
      const idUsuario = +params['id'];
      this.obtenerAreas()
      this.obtenerRoles()
      this.obtenerUsuario(idUsuario);
    });

    //this.obtenerAreas();
    //this.obtenerRoles();
  }
  obtenerAreas(): void {
    this.registroService.getAreas(this.token)
      .subscribe(
        (response : any) => {
          this.areas = response.data;
          console.log(this.areas);
          
        },
        error => {
          console.error('Error al obtener las áreas:', error);
          Swal.fire('Error', 'No se pudieron obtener las áreas', 'error');
        }
      );
  }

  obtenerRoles(): void {
    this.registroService.getRoles(this.token)
      .subscribe(
        (response  :any) => {
          this.roles = response.data;
          console.log(this.roles);
          
        },
        error => {
          console.error('Error al obtener los roles:', error);
          Swal.fire('Error', 'No se pudieron obtener los roles', 'error');
        }
      );
  }
  obtenerUsuario(idUsuario: number): void {
    this.registroService.obtenerUsuarioPorId(idUsuario, this.token)
      .subscribe(
        (response : any)=> {
          //console.log(response);
          
          this.editandoUsuario= response.usuario[0]
          //this.editandoUsuario = this.res.usuario[0];
          console.log(this.editandoUsuario);
          
        },
        error => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire('Error', 'No se pudo obtener el usuario', 'error');
        }
      );
  }

  actualizarUsuario(form: NgForm): void {
    console.log(form.value);
    console.log(this.editandoUsuario);
    
    
    if (form.valid && this.editandoUsuario) {
      this.registroService.actualizarUsuario(this.editandoUsuario, this.token)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El usuario se actualizó correctamente', 'success');
            this.router.navigate(['/regisusuario']);
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
