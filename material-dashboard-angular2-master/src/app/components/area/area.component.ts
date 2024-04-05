import { Component, OnInit } from '@angular/core';
import { Area } from 'models/area.model';
import { AreaService } from 'services/area.service';
import { AuthService } from 'services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  nuevaArea: Area = new Area(0, '', '', '', '');
  areas: Area[] = [];
  editandoArea: Area | null = null; 


  area=[{
    id_area : 1,
    tipo_area: 'rrhh',
    fecha_creacion:'20240301',
    estado : 's',
    fecha_modificacion: ''
},{
  id_area : 2,
  tipo_area: 'administracion',
  fecha_creacion:'20240301',
  estado : 's',
  fecha_modificacion: ''
},{
  id_area : 3,
  tipo_area: 'desarrollo',
  fecha_creacion:'20240301',
  estado : 's',
  fecha_modificacion: ''
}]

  constructor(private areaService: AreaService,  private authService:AuthService) { }

  ngOnInit(): void {
    this.listarAreas();
  }

  // listar area
  listarAreas() {
    this.areaService.listarAreas().subscribe(
      (areas) => this.areas = areas,
      (error) => console.error('Error al obtener áreas:', error)
    );
  }

  registrarNuevaArea(form:NgForm): void {
    if (form.valid) {
      const { tipo, estado } = form.value;
      this.nuevaArea.tipo_area = tipo;
      this.nuevaArea.estado = estado;
      this.areaService.registrarArea(this.nuevaArea)
        .subscribe(area=> {
          this.areas.push(area);
          this.nuevaArea = new Area(0, '', '', '', '');
          form.reset();
        });
    }
  }
  editarArea(area: Area): void {
    this.editandoArea = { ...area };
  }

  actualizarArea(): void {
    if (this.editandoArea) {
      this.areaService.actualizarArea(this.editandoArea).subscribe(
        (area) => {
          const index = this.areas.findIndex(
            (a) => a.id_area === area.id_area
          );
          this.areas[index] = area;
          this.editandoArea = null;
        },
        (error) => console.error('Error al actualizar área:', error)
      );
    }
  }

  cambiarEstadoArea(idArea: number, estado: string): void {
    this.areaService.cambiarEstadoArea(idArea, estado).subscribe(
      (response) => {
        console.log('Estado del área cambiado:', response);
        this.listarAreas();
      },
      (error) =>
        console.error('Error al cambiar estado del área:', error)
    );
  }

}






