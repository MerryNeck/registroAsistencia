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
  rutarol: string= '';
  public res:any;
  
  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.rutarol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutarol === ''){
      this.router.navigate(['/login']);
    }else if(this.rutarol !== 'admin'){
      this.router.navigate(['/asistencia']);
    }
    else{
      this.route.params.subscribe(params => {
        const idArea = +params['id'];
        this.obtenerArea(idArea);
      })
    }
    ;
  }

  obtenerArea(idArea: number): void {
    this.areaService.obtenerAreaPorId(idArea, this.token,this.rutarol )
      .subscribe(
       (response : any) => {
          this.editandoArea = response.data
          console.log(this.editandoArea);
          
        },
        error => {
          console.error('Error al obtener el área:', error);
          Swal.fire('Error', 'No se pudo obtener el área', 'error');
        }
      );
  }

  actualizarArea(form: NgForm): void {
    if (this.editandoArea !== null) {
      this.areaService.actualizarArea(this.editandoArea, this.token, this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El área se actualizó correctamente', 'success');
            this.router.navigate(['/area']);
          },
          error => {
            console.error('Error al actualizar el área:', error);
            Swal.fire('Error', 'No se pudo actualizar el área', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }
}