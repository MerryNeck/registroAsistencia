import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { RegistroService } from 'services/registro.service';

@Component({
  selector: 'app-anticipo-edit',
  templateUrl: './anticipo-edit.component.html',
  styleUrls: ['./anticipo-edit.component.css']
})
export class AnticipoEditComponent {
 
  editandoAnticipo: any;
  token: string = '';
  public res:any;
  rutarol: string = '';
  public user:any[]=[];
  rutaRol : string = '';
  public users : any[]=[];
  constructor(
    private anticipoService: AnticipoService,
    private usuarioService  : RegistroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.rutaRol = localStorage.getItem('rol') || '';
   }

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
        this.obtenerAnticipo(idAnticipo);
      });
    }
    
  }

  obtenerAnticipo(idAnticipo: number): void {
    this.anticipoService.obtenerAnticipoPorId(idAnticipo, this.token,this.rutarol)
      .subscribe(
        (response:any)=> {
        
          this.editandoAnticipo = response.data;
          console.log(this.editandoAnticipo);
          
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
