import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Pago } from 'models/pago.model';
import { PagoService } from 'services/pago.service';

@Component({
  selector: 'app-pago-edit',
  templateUrl: './pago-edit.component.html',
  styleUrls: ['./pago-edit.component.css']
})
export class PagoEditComponent implements OnInit {

  //editandoPago:  Pago = {id_sueldo:0, dias_trabajado: 0, retencion:0,sueldo:0,sueldo_bruto:0,id_usuario:0,estado: '', fecha_creacion: '', fecha_modificacion: ''};
  editandoPago  : any
  token: string = '';
  rutarol:string ='';
  public res: any;
  constructor(
    private pagoService: PagoService,
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
        const idPago = +params['id'];
        this.obtenerPago(idPago);
      });
    }
    
  }

  obtenerPago(idPago: number): void {
    this.pagoService.obtenerPagoPorId(idPago, this.token,this.rutarol)
      .subscribe(
        pago => {
          this.res = pago;
          this.editandoPago =this.res.data;
          console.log(this.editandoPago);
          
          
        },
        error => {
          console.error('Error al obtener el pago:', error);
          Swal.fire('Error', 'No se pudo obtener el pago', 'error');
        }
      );
  }

  actualizarPago(form: NgForm): void {
    if (form.valid && this.editandoPago) {
      this.pagoService.actualizarPago(this.editandoPago, this.token,this.rutarol)
        .subscribe(
          () => {
            Swal.fire('Éxito', 'El pago se actualizó correctamente', 'success');
            this.router.navigate(['/pago']);
          },
          error => {
            console.error('Error al actualizar el pago:', error);
            Swal.fire('Error', 'No se pudo actualizar el pago', 'error');
          }
        );
    } else {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
    }
  }

}
