import { Component, OnInit } from '@angular/core';
import { Pago } from 'models/pago.model';
import { PagoService } from 'services/pago.service';
import { NgForm } from '@angular/forms';

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

  info=[{
    id_sueldo : 1,
    ci:'132776634',
    dias_trabajo: 30,
    retencion: 0,
    sueldo: 0,
    sueldo_bruto: 0,
    estado : 's',
    fecha_creacion: '20240301' ,
    fecha_nodificacion: '20240301' ,
  },{
    id_sueldo : 2,
    ci:'132776634',
    dias_trabajo: 30,
    retencion: 0,
    sueldo: 0,
    sueldo_bruto: 0,
    estado : 'n',
    fecha_creacion: '20240301' ,
    fecha_nodificacion: '20240301' ,
  },{
    id_sueldo : 3,
    ci:'132776634',
    dias_trabajo: 30,
    retencion: 0,
    sueldo: 0,
    sueldo_bruto: 0,
    estado : 's',
    fecha_creacion: '20240301' ,
    fecha_nodificacion: '20240301' ,
  }]

  constructor(private pagoService: PagoService) { }

  ngOnInit(): void {
    this.obtenerPago();
  }
  
  // listar area
  obtenerPago(): void {
    this.pagoService.obtenerPago()
      .subscribe(pagos => this.pagos = pagos);
  }

  registrarNuevoPago(form:NgForm): void {
    if (form.valid) {
      const { ci, sueldo, dias_trabajo,retencion, sueldo_bruto } = form.value;
      this.nuevoPago.id_usuario = ci;
      this.nuevoPago.sueldo = sueldo;
      this.nuevoPago.dias_trabajo = dias_trabajo;
      this.nuevoPago.retencion = retencion;
      this.nuevoPago.sueldo_bruto =sueldo_bruto
      this.pagoService.registrarPago(this.nuevoPago)
        .subscribe(pago=> {
          this.pagos.push(pago);
          this.nuevoPago = new Pago(0, '', '', '', 0, 0, 0, 0, 0);
          form.reset();
        });
    }
  }
  editarPago(pago: Pago): void {
    this.editandoPago = { ...pago };
  }

  actualizarPago(): void {
    if (this.editandoPago) {
      this.pagoService.actualizarPago(this.editandoPago).subscribe(
        (pago) => {
          const index = this.pagos.findIndex(
            (p) => p.id_sueldo === pago.id_sueldo
          );
          this.pagos[index] = pago;
          this.editandoPago = null;
        },
        (error) => console.error('Error al actualizar área:', error)
      );
    }
  }

  cambiarEstadoPago(idPago: number, estado: string): void {
    this.pagoService.cambiarEstadoPago(idPago, estado)
      .subscribe(() => {
        this.pagos = this.pagos.filter(a => a.id_sueldo !== idPago);
      });
  }

  buscarAnticipoPorCi(ci: string): void {
    this.pagoService.buscarPorCi(ci)
      .subscribe({
        next: (pagos) => {
          this.pagos = pagos; 
        },
        error: (error) => {
          console.error('Error al buscar boletas por CI', error);
        }
      });
  }
}
