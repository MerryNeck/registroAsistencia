import { Component, OnInit } from '@angular/core';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';

@Component({
  selector: 'app-anticipo',
  templateUrl: './anticipo.component.html',
  styleUrls: ['./anticipo.component.css']
})
export class AnticipoComponent implements OnInit {
 anticipos:Anticipo[] =[];
 constructor(private anticipoService: AnticipoService) { }

  ngOnInit(): void {
    this.cargarAnticipos();

  }
  cargarAnticipos(): void {
    this.anticipoService.obtenerAnticipo().subscribe({
      next: (data) => {
        this.anticipos = data;
      },
      error: (e) => console.error(e)
    });
  }

  registrarNuevoAnticipo(anticipo: Anticipo): void {
    this.anticipoService.registrarAnticipo(anticipo).subscribe({
      next: () => {
        console.log('Anticipo registrado con éxito');
        this.cargarAnticipos(); // Recargar la lista para mostrar el nuevo anticipo
      },
      error: (e) => console.error(e)
    });
  }

  actualizarAnticipo(anticipo: Anticipo): void {
    this.anticipoService.actualizarAnticipo(anticipo).subscribe({
      next: () => {
        console.log('Anticipo actualizado con éxito');
        this.cargarAnticipos(); // Recargar para mostrar los cambios
      },
      error: (e) => console.error(e)
    });
  }

  cambiarEstado(idArea: number, nuevoEstado: string): void {
    this.anticipoService.cambiarEstadoAnticipo(idArea, nuevoEstado).subscribe({
      next: () => {
        console.log('Estado cambiado con éxito');
        this.cargarAnticipos(); // Opcionalmente recargar o ajustar la vista según necesites
      },
      error: (e) => console.error(e)
    });
  }

}
