
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Anticipo } from 'models/anticipo.model';
import { AnticipoService } from 'services/anticipo.service';


@Component({
  selector: 'app-anticipo',
  templateUrl: './anticipo.component.html',
  styleUrls: ['./anticipo.component.css']
})
export class AnticipoComponent implements OnInit {
 anticipos:Anticipo[] =[];
 nuevoAnticipo: Anticipo = new Anticipo(0, '', '', '', 0, 0);
 editandoAnticipo: Anticipo | null = null;

 anticipo=[{
      id_anticipo : 1,
      id_usuario: 2,
      anticipo: 100,
      estado : 's',
      fecha_creacion: '20240301' ,
 },{
  id_anticipo : 2,
  id_usuario: 2,
  anticipo: 100,
  estado : 's',
  fecha_creacion: '20240301' ,
},{
  id_anticipo : 3,
  id_usuario: 2,
  anticipo: 100,
  estado : 's',
  fecha_creacion: '20240301' ,
}]


 constructor(private anticipoService: AnticipoService) { }

  ngOnInit(): void {
    this.obtenerAnticipos();

  }

  obtenerAnticipos(): void {
    this.anticipoService.obtenerAnticipo()
      .subscribe(anticipos => this.anticipos = anticipos);
  }
  registrarNuevoAnticipo(form:NgForm): void {
    if (form.valid) {
      const { ci, anticipo } = form.value;
      this.nuevoAnticipo.id_usuario = ci;
      this.nuevoAnticipo.anticipos = anticipo;
      this.anticipoService.registrarAnticipo(this.nuevoAnticipo)
        .subscribe(anticipo => {
          this.anticipos.push(anticipo);
          this.nuevoAnticipo = new Anticipo(0, '', '', '', 0, 0);
          form.reset();
        });
    }
  }
  editarAnticipo(anticipo: Anticipo): void {
    this.editandoAnticipo = { ...anticipo };
  }

  actualizarAnticipo(): void {
    if (this.editandoAnticipo) {
      this.anticipoService.actualizarAnticipo(this.editandoAnticipo)
        .subscribe(anticipo => {
          const index = this.anticipos.findIndex(a => a.id_anticipo === anticipo.id_anticipo);
          this.anticipos[index] = anticipo;
          this.editandoAnticipo = null;
        });
    }
  }

  cambiarEstadoAnticipo(idAnticipo: number, estado: string): void {
    this.anticipoService.cambiarEstadoAnticipo(idAnticipo, estado)
      .subscribe(() => {
        this.anticipos = this.anticipos.filter(a => a.id_anticipo !== idAnticipo);
      });
  }

}
