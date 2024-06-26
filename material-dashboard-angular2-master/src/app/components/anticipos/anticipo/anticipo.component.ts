import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
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
  token: string = '';
  estado: string;
  public res: any;
  public anticiposUser: any;
  public anticipodata:any;
  rutaRol : string = '';
  
  constructor(private anticipoService: AnticipoService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.rutaRol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutaRol === ''){
      this.router.navigate(['/login'])
    }else if(this.rutaRol !== 'admin' ){
      this.router.navigate(['/asistencia'])
    }
    else{
      this.obtenerAnticipos();
    }
      
  }

  obtenerAnticipos(): void {
    this.anticipoService.obtenerAnticipo(this.token,this.rutaRol)
      .subscribe((response) => {
        this.res = response
        if (this.res.ok) {
          this.anticiposUser = this.res.data;
          console.log(this.anticiposUser);
        } else {
        }
        error => Swal.fire('Error', 'No se pudieron obtener los anticipos', 'error')
      });
  }

  registrarNuevoAnticipo(form: NgForm): void {
    if (form.valid) {
      const { ci, anticipo } = form.value;

      this.nuevoAnticipo.id_usuario = ci;
      this.nuevoAnticipo.anticipos = anticipo;
      this.anticipoService.registrarAnticipo(this.nuevoAnticipo, this.token ,this.rutaRol)
        .subscribe(
          (response: any) => {
            this.anticipodata =response.data
            this.anticipos.push(this.anticipodata);
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

  editarAnticipo(anticipo: Anticipo): void {
    this.router.navigate(['/editar-anticipo', anticipo.id_anticipo]);
  }

  buscarAnticipoPorCi(ci: string): void {
    this.anticipoService.buscarPorCi(ci, this.token,this.rutaRol)
      .subscribe(
        (response) => {
          this.res = response;
          this.anticiposUser = this.res.data
        },
        (error) => {
          console.error('Error al buscar boletas por CI', error);
          Swal.fire('Error', 'No se pudieron buscar los anticipos', 'error');
        });
  }

  cambiarEstadoAnticipo(idAnticipo: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;
    this.anticipoService.cambiarEstadoAnticipo(idAnticipo, nuevoEstado, this.token,this.rutaRol)
    .subscribe(
       (response) => {
        this.res = response;
        this.estado =this.res.data 
        Swal.fire({
          title: '¡Éxito!',
          text: `Estado del anticipo actualizado correctamente a ${this.estado === 's' ? 'activado' : 'desactivado'}.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.obtenerAnticipos();
          }
        });
      });
      
      (error) => {
        console.error('Error al cambiar el estado:', error);
        this.estado = estadoAnterior;
        Swal.fire('Error', 'No se pudo cambiar el estado del anticipo', 'error');


      }
    
  }

}
