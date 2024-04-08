import { Component, OnInit } from '@angular/core';
import { Pago } from 'models/pago.model';
import { PagoService } from 'services/pago.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from 'express';

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

  info=[{
    id_sueldo : '1',
    ci:'132776634',
    dias_trabajo: '30',
    retencion: '0',
    sueldo:'0',
    sueldo_bruto: '0',
    estado : 's',
    fecha_creacion: '20240301' ,
    fecha_nodificacion: '' ,
  },{
    id_sueldo : '2',
    ci:'132776634',
    dias_trabajo: '30',
    retencion: '0',
    sueldo:'0',
    sueldo_bruto: '0',
    estado : 's',
    fecha_creacion: '20240301' ,
    fecha_nodificacion: '' ,
  },{
    id_sueldo : '3',
    ci:'132776634',
    dias_trabajo: '30',
    retencion: '0',
    sueldo:'0',
    sueldo_bruto: '0',
    estado : 's',
    fecha_creacion: '20240301' ,
    fecha_nodificacion: '' ,
  }]

  constructor(private pagoService: PagoService ,private router:Router) { }

  ngOnInit(): void {
    this.obtenerPago();
    this.token = localStorage.getItem('token') || ''
  }
  
  // listar area
  obtenerPago(): void {
    this.pagoService.obtenerPago(this.token)
      .subscribe(pagos => this.pagos = pagos,
        error => Swal.fire('Error', 'No se pudieron obtener los anticipos', 'error')
      );
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
        error => Swal.fire('Error', 'No se pudo registrar el anticipo', 'error')
      );
  } else {
    Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
  }
  }
 
  buscarAnticipoPorCi(ci: string): void {
    this.pagoService.buscarPorCi(ci,this.token)
      .subscribe({
        next: (pagos) => {
          this.pagos = pagos; 
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
          Swal.fire('Error', 'No se pudieron buscar los anticipos', 'error');
        }
      });
  }
}
