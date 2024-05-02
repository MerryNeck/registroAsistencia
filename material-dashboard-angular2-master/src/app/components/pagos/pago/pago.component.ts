import { Component, OnInit } from '@angular/core';
import { Pago } from 'models/pago.model';
import { PagoService } from 'services/pago.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegistroService } from 'services/registro.service';

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
  public users: any[]=[];
  editandoPago: Pago | null = null; 
  token:string='';
  estado:string;
  public ci  :any;
  
  public res: any;
  public pagoUser : any;
  rutaRol:string='';

  constructor(private pagoService: PagoService ,
    private router:Router,
    private usuarioService: RegistroService) { }

  ngOnInit(): void {
    
    this.token = localStorage.getItem('token') || '';
    this.rutaRol = localStorage.getItem('rol') || '';
    if(this.token === '' && this.rutaRol === ''){
      this.router.navigate(['/login'])
    }else if(this.rutaRol !== 'admin' ){
      this.router.navigate(['/asistencia'])
    }else{
      this.obtenerPago();
    }

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
    this.obtenerPago();
  }
  
  // listar area
  obtenerPago(): void {
    this.pagoService.obtenerPago(this.token, this.rutaRol)
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
    console.log(form.value);
    
    if (form.valid) {
      const { id_usuario, sueldo, trabajo,retencion, sueldo_bruto } = form.value;
      this.nuevoPago.id_usuario = id_usuario;
      this.nuevoPago.sueldo = sueldo;
      this.nuevoPago.dias_trabajado = trabajo;
      this.nuevoPago.retencion = retencion;
      this.nuevoPago.sueldo_bruto =sueldo_bruto
      this.pagoService.registrarPago(this.nuevoPago, this.token, this.rutaRol)
        .subscribe(pago=> {
          this.pagos.push(pago);
          this.nuevoPago = new Pago(0, '', '', '', 0, 0, 0, 0, 0);
          form.reset();
          Swal.fire('Éxito', 'El anticipo fue registrado correctamente', 'success');
        },
        error => Swal.fire('Error', 'No se pudo registrar el pago', 'error')
      );
      this.obtenerPago();
  } else {
    Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
  }
  this.obtenerPago();
  }
 
  buscarAnticipoPorCi(ci: string): void {
    this.pagoService.buscarPorCi(ci,this.token,this.rutaRol)
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
    this.pagoService.cambiarEstadoPago(idPago, nuevoEstado, this.token,this.rutaRol).subscribe((response) => {
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
