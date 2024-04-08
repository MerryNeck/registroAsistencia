import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from 'express';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anticipo',
  templateUrl: './anticipo.component.html',
  styleUrls: ['./anticipo.component.css']
})
export class AnticipoComponent implements OnInit {

  ciBusqueda: string = '';
  fechaBusqueda: string = '';
  anticipos: Anticipo[] = [];
  nuevoAnticipo: Anticipo = new Anticipo(0, '', '', '', 0, 0);
  editandoAnticipo: Anticipo | null = null;
  token: string = '';

 info=[{
      id_anticipo : 1,
      id_usuario: 2,
      anticipos: 100,
      estado : 's',
      fecha_creacion: '20240301' ,
      fecha_modificacion: '' ,
 },{
  id_anticipo : 2,
  id_usuario: 2,
  anticipos: 100,
  estado : 's',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '',
},{
  id_anticipo : 3,
  id_usuario: 2,
  anticipos: 100,
  estado : 's',
  fecha_creacion: '20240301' ,
  fecha_modificacion: '',
}]


 constructor(private anticipoService: AnticipoService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerAnticipos();
    this.token = localStorage.getItem('token') || ''

  }

  obtenerAnticipos(): void {
    this.anticipoService.obtenerAnticipo(this.token)
      .subscribe(
        anticipos => this.anticipos = anticipos,
        error => Swal.fire('Error', 'No se pudieron obtener los anticipos', 'error')
      );
  }

  registrarNuevoAnticipo(form: NgForm): void {
    if (form.valid) {
      const { ci, anticipo } = form.value;
      this.nuevoAnticipo.id_usuario = ci;
      this.nuevoAnticipo.anticipos = anticipo;
      this.anticipoService.registrarAnticipo(this.nuevoAnticipo, this.token)
        .subscribe(
          anticipo => {
            this.anticipos.push(anticipo);
            this.nuevoAnticipo = new Anticipo(0, '', '', '', 0, 0);
            form.reset();
            Swal.fire('Éxito', 'El anticipo fue registrado correctamente', 'success');
          },
          error => Swal.fire('Error', 'No se pudo registrar el anticipo', 'error')
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

   /* this.router.(['/editar-anticipo/:id', anticipo.id_anticipo]);
  }*/

  buscarAnticipoPorCi(ci: string): void {
    this.anticipoService.buscarPorCi(ci, this.token)
      .subscribe({
        next: (anticipos) => {
          this.anticipos = anticipos;
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
          Swal.fire('Error', 'No se pudieron buscar los anticipos', 'error');
        }
      });
  }

}
