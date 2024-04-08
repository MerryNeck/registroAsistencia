import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Usuario } from 'models/usuario.model';
import { RegistroService } from 'services/registro.service';

@Component({
  selector: 'app-registro-edit',
  templateUrl: './registro-edit.component.html',
  styleUrls: ['./registro-edit.component.css']
})
export class RegistroEditComponent implements OnInit {

  editandoUsuario: Usuario | null = null;
  token: string = '';

  constructor(
    private registroService: RegistroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.route.params.subscribe(params => {
      const idUsuario = +params['id'];
      this.obtenerUsuario(idUsuario);
    });
  }

  obtenerUsuario(idUsuario: number): void {
    this.registroService.obtenerUsuarioPorId(idUsuario, this.token)
      .subscribe(
        usuario => {
          this.editandoUsuario = usuario;
        },
        error => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire('Error', 'No se pudo obtener el usuario', 'error');
        }
      );
  }

  actualizarUsuario(form: NgForm): void {
    if (form.valid && this.editandoUsuario) {
      this.registroService.actualizarUsuario(this.editandoUsuario, this.token)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El usuario se actualizó correctamente', 'success');
            this.router.navigate(['/anticipo']);
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire('Error', 'No se pudo actualizar el isuario', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
