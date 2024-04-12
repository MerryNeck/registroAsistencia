import { Component, OnInit } from '@angular/core';
import { Pago } from 'models/pago.model';
import { PagoService } from 'services/pago.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  ciBusqueda: string = '';
  fechaBusqueda: string = '';
  nuevoPago: Pago = new Pago(0, '', '', '', 0, 0, 0, 0, 0);
  pagos: Pago[] = [];
  editandoPago: Pago | null = null; 
  token:string='';
  estado:string;
  
  public res: any;
  public pagoUser : any;

  constructor(private pagoService: PagoService ,private router:Router) { }

  ngOnInit(): void {
    this.obtenerPago();
    this.token = localStorage.getItem('token') || ''
  }
  
  // listar area
  obtenerPago(): void {
    this.pagoService.obtenerPago(this.token)
    .subscribe ((response) =>{
      this.res = response
   if (this.res.ok) {
     this.pagoUser = this.res.data;
     console.log(this.pagoUser);
   } else {
    error => Swal.fire('Error', 'No se pudieron obtener los pagos', 'error')
   }
        
      });
  }

  registrarNuevoPago(form:NgForm): void {
    if (form.valid) {
      const { ci, sueldo, dias_trabajo,retencion, sueldo_bruto } = form.value;
      this.nuevoPago.id_usuario = ci;
      this.nuevoPago.sueldo = sueldo;
      this.nuevoPago.dias_trabajo = dias_trabajo;
      this.nuevoPago.retencion = retencion;
      this.nuevoPago.sueldo_bruto =sueldo_bruto
      this.pagoService.registrarPago(this.nuevoPago,this.token)
        .subscribe(pago=> {
          this.pagos.push(pago);
          this.nuevoPago = new Pago(0, '', '', '', 0, 0, 0, 0, 0);
          form.reset();
          Swal.fire('Éxito', 'El anticipo fue registrado correctamente', 'success');
        },
        error => Swal.fire('Error', 'No se pudo registrar el pago', 'error')
      );
  } else {
    Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
  }
  }
 
  buscarAnticipoPorCi(ci: string): void {
    this.pagoService.buscarPorCi(ci,this.token)
      .subscribe( (reponse) => {
        this.res = reponse
          this.pagoUser = this.res.data; 
        }, (error) => {
          console.error('Error al buscar boletas por CI', error);
          Swal.fire('Error', 'No se pudieron buscar los pagos', 'error');
        });
        
      }
  
  editarPago(pagos: Pago): void {
    this.router.navigate(['/editar-pago', pagos.id_sueldo]);
  }
  cambiarEstadoPago(idPago: number, nuevoEstado: string) {
    const estadoAnterior = this.estado;
    this.estado = nuevoEstado;
    this.pagoService.cambiarEstadoPago(idPago, nuevoEstado, this.token).subscribe((response) => {
      this.res =response;
      this.estado = this.res.data  
      Swal.fire({
          title: '¡Éxito!',
          text: `Estado del pago actualizado correctamente a ${this.estado === 's' ? 'activado' : 'desactivado'}.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.obtenerPago();
          }
        });
      }, (error) => {
        console.error('Error al cambiar el estado:', error);
        this.estado = estadoAnterior;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cambiar el estado del pago.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
    }
}
