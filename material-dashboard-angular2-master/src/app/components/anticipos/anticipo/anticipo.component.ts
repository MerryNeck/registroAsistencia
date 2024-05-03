import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';
import { RegistroService } from 'services/registro.service';
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
  public users : any[]=[];
  nuevoAnticipo: Anticipo = new Anticipo(0, '', '','', '', 0,0,'');
  token: string = '';
  estado: string;
  public res: any;
  public anticiposUser: any;
  public anticipodata:any;
  rutaRol : string = '';
  
  constructor(private anticipoService: AnticipoService, 
    private router: Router,
  private usuarioService: RegistroService) {
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

  ngOnInit(): void {
    

    this.usuarioService.obtenerUsuario(this.token, this.rutaRol).subscribe(
      (response: any) => {
        if (response.ok) {
          console.log("Respuesta del servicio de usuarios:", response);
          this.users = response.data;
          console.log(this.users);
        }
      },
      (error) => {
        console.error("Error al cargar las usuarios", error);
        (error) =>
          Swal.fire("Error", "No se pudo registrar el usuario", "error");
      },
    );
    console.log("usuarios",this.usuarioService.obtenerUsuario);
    this.obtenerAnticipos();
  }

  onInputChange(): void {
    if (!this.ciBusqueda || !this.fechaBusqueda) {
      this.obtenerAnticipos();
    } 
  }

  obtenerAnticipos(): void {
    this.anticipoService.obtenerAnticipo(this.token,this.rutaRol)
      .subscribe((response) => {
        this.res = response
        if (this.res.ok) {
          console.log(this.res);
          
          this.anticiposUser = this.res.data;
          console.log(this.anticiposUser);
        } else {
        }
        error => Swal.fire('Error', 'No se pudieron obtener los anticipos', 'error')
      });
  }

  registrarNuevoAnticipo(form: NgForm): void {
  
    if (form.valid) {
      const {id_usuario,fecha, anticipo,detalle } = form.value;
      this.nuevoAnticipo.anticipos = anticipo;
      this.nuevoAnticipo.id_usuario = id_usuario;
      this.nuevoAnticipo.fecha = fecha;
      this.nuevoAnticipo.detalle =detalle;
      console.log(this.nuevoAnticipo);
      
      this.anticipoService.registrarAnticipo(this.nuevoAnticipo, this.token ,this.rutaRol)
        .subscribe(
          (response: any) => {
            this.anticipodata =response.data
            this.anticipos.push(this.anticipodata);
            this.nuevoAnticipo = new Anticipo(0, '','', '', '',0, 0,'');
            form.reset();
            Swal.fire('Éxito', 'El anticipo fue registrado correctamente', 'success');
            this.obtenerAnticipos();
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
          console.log(this.anticiposUser);
          
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
  verBoleta(): void {

    this.router.navigate(['/boleta-anticipo']);


  }


}
