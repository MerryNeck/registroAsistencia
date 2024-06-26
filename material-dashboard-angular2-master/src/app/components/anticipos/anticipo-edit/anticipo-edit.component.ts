import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-anticipo-edit',
  templateUrl: './anticipo-edit.component.html',
  styleUrls: ['./anticipo-edit.component.css']
})
export class AnticipoEditComponent {
 
  editandoAnticipo: Anticipo = {id_anticipo:0, anticipos: 0, id_usuario:0,estado: '', fecha_creacion: '', fecha_modificacion: '' };
  token: string = '';
  public res:any;
  rutarol: string = '';

  constructor(
    private anticipoService: AnticipoService,
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
        const idAnticipo = +params['id'];
        this.obtenerAnticipo(idAnticipo);
      });
    }
    
  }

  obtenerAnticipo(idAnticipo: number): void {
    this.anticipoService.obtenerAnticipoPorId(idAnticipo, this.token,this.rutarol)
      .subscribe(
        (response:any)=> {
        
          this.editandoAnticipo = response.data;
        },
        error => {
          console.error('Error al obtener el anticipo:', error);
          Swal.fire('Error', 'No se pudo obtener el anticipo', 'error');
        }
      );
  }

  actualizarAnticipo(form: NgForm): void {
    if ( this.editandoAnticipo != null) {
      this.anticipoService.actualizarAnticipo(this.editandoAnticipo, this.token ,this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El anticipo se actualizó correctamente', 'success');
            this.router.navigate(['/anticipo']);
          },
          error => {
            console.error('Error al actualizar el anticipo:', error);
            Swal.fire('Error', 'No se pudo actualizar el anticipo', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }
   
}
