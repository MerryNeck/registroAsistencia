import { Component, OnInit } from '@angular/core';
import { Area } from 'models/area.model';
import { AreaService } from 'services/area.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css']
})
export class AreaEditComponent implements OnInit {

  
  editandoArea: Area  = {id_area:0, tipo_area: '', estado: '', fecha_creacion: '', fecha_modificacion: '' };
  token: string = '';

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.route.params.subscribe(params => {
      const idArea = +params['id'];
      this.obtenerArea(idArea);
    });
  }

  obtenerArea(idArea: number): void {
    this.areaService.obtenerAreaPorId(idArea, this.token)
      .subscribe(
        area => {
          this.editandoArea = area;
        },
        error => {
          console.error('Error al obtener el area:', error);
          Swal.fire('Error', 'No se pudo obtener el area', 'error');
        }
      );
  }

  actualizarArea(form: NgForm): void {
    if (form.valid && this.editandoArea) {
      this.areaService.actualizarArea(this.editandoArea, this.token)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El area se actualizó correctamente', 'success');
            this.router.navigate(['/area']);
          },
          error => {
            console.error('Error al actualizar el area:', error);
            Swal.fire('Error', 'No se pudo actualizar el area', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }


}
