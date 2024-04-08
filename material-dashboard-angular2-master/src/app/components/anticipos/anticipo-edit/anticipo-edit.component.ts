import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anticipo-edit',
  templateUrl: './anticipo-edit.component.html',
  styleUrls: ['./anticipo-edit.component.css']
})
export class AnticipoEditComponent {
  @Input() anticipo: Anticipo | null = null;
  @Output() actualizacionCompletada = new EventEmitter<void>();
  token: string = ''; // Inicializa el token vacío

  constructor(private anticipoService: AnticipoService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || ''; // Obtener el token desde el localStorage
  }

  actualizarAnticipo(): void {
    if (this.anticipo) {
      this.anticipoService.actualizarAnticipo(this.anticipo, this.token)
        .subscribe(
          () => {
            this.actualizacionCompletada.emit();
            Swal.fire('Éxito', 'El anticipo fue actualizado correctamente', 'success');
          },
          error => Swal.fire('Error', 'No se pudo actualizar el anticipo', 'error')
        );
    }
  }

  cambiarEstadoAnticipo(idAnticipo: number, estado: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se cambiará el estado del anticipo con ID ${idAnticipo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.anticipoService.cambiarEstadoAnticipo(idAnticipo, estado, this.token)
          .subscribe(
            () => {
              this.actualizacionCompletada.emit();
              Swal.fire('Éxito', 'El estado del anticipo fue actualizado', 'success');
            },
            error => Swal.fire('Error', 'No se pudo actualizar el estado del anticipo', 'error')
          );
      }
    });
  }
}
