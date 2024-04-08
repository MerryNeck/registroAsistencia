import { Component, OnInit } from '@angular/core';
import { Area } from 'models/area.model';
import { AreaService } from 'services/area.service';
import { NgForm } from '@angular/forms';
import { Router } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  nuevaArea: Area = new Area(0, '', '', '', '');
  areas: Area[] = [];
  editandoArea: Area | null = null; 
  token: string = '';

  info=[{
    id_area : 1,
    tipo_area: 'rrhh',
    estado : 's',
    fecha_creacion:'20240301',
    fecha_modificacion: '',
},{
  id_area : 2,
  tipo_area: 'administracion',
  estado : 's',
  fecha_creacion:'20240301',
  fecha_modificacion: '',
},{
  id_area : 3,
  tipo_area: 'desarrollo',
  estado : 's',
  fecha_creacion:'20240301',
  fecha_modificacion: '',
}]

  constructor(private areaService: AreaService,  private router:Router) { }

  ngOnInit(): void {
    this.listarAreas();
    this.token = localStorage.getItem('token') || ''
  }

  // listar area
  listarAreas() {
    this.areaService.listarAreas().subscribe(
      areas => this.areas = areas,
      error => Swal.fire('Error', 'No se pudieron obtener los datos del area', 'error')
    );
  }

  registrarNuevaArea(form:NgForm): void {
    if (form.valid) {
      const { tipo, estado } = form.value;
      this.nuevaArea.tipo_area = tipo;
      this.nuevaArea.estado = estado;
      this.areaService.registrarArea(this.nuevaArea,this.token)
        .subscribe(area=> {
          this.areas.push(area);
          this.nuevaArea = new Area(0, '', '', '', '');
          form.reset();
          Swal.fire('Éxito', 'El area fue registrado correctamente', 'success');
        },
        error => Swal.fire('Error', 'No se pudo registrar el area', 'error')
      );
  } else {
    Swal.fire('Advertencia', 'Por favor, complete todos los campos', 'warning');
  }
  }

}






