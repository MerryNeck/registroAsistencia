import { Component, OnInit } from '@angular/core';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css']
})
export class RolEditComponent implements OnInit {

  //editandoRol: Rol | null = null;
  editandoRol: Rol = {id_rol:0, tipo: '', estado: '', fecha_creacion: '', fecha_modificacion: '' };
  token: string = '';
  rutarol:string='';
  public res:any;
  constructor(
    private rolService: RolService,
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
    }else{
      this.route.params.subscribe(params => {
        const idRol = +params['id'];
        this.obtenerRol(idRol);
      });
    }
    
  }

  obtenerRol(idRol: number): void {
    this.rolService.obtenerRolPorId(idRol, this.token,this.rutarol)
      .subscribe(
        (response  :any) => {
          this.editandoRol = response.data;
          console.log(this.editandoRol);
          
        },
        error => {
          console.error('Error al obtener el rol:', error);
          Swal.fire('Error', 'No se pudo obtener el rol', 'error');
        }
      );
  }

  actualizarRol(form: NgForm): void {
    if ( this.editandoRol) {
      this.rolService.actualizarRol(this.editandoRol, this.token,this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El rol se actualizó correctamente', 'success');
            this.router.navigate(['/rol']);
          },
          error => {
            console.error('Error al actualizar el rol:', error);
            Swal.fire('Error', 'No se pudo actualizar el rol', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
