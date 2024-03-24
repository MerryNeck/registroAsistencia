import { Component, OnInit } from '@angular/core';
import { Area } from 'models/area.model';
import { AreaService } from 'services/area.service';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  nuevaArea: Area = new Area(0, '', '', '', '');
  areas: Area[] = [];
  nuevaRol: Rol = new Rol(0, '', '', '', '');
  roles: Rol[] = [];

  estado = ''; 
  area = '';  
  rol = '';

  constructor(private areaService: AreaService, private rolService: RolService) { }

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

  guardarArea() {
    if (this.nuevaArea.id_area) {
      // actualizar area
      this.areaService.actualizarArea(this.nuevaArea).subscribe(
        (response) => {
          console.log('Área actualizada:', response);
          this.listarAreas();
        },
        (error) => console.error('Error al actualizar área:', error)
      );
    } else {
      // registrar area
      this.areaService.registrarArea(this.nuevaArea).subscribe(
        (response) => {
          console.log('Área registrada:', response);
          this.listarAreas();
        },
        (error) => console.error('Error al registrar área:', error)
      );
    }
  }

  // Cambiar estado 
  cambiarEstado(id: number, estado: string) {
    this.areaService.cambiarEstadoArea(id, estado).subscribe(
      (response) => {
        console.log('Estado del área cambiado:', response);
        this.listarAreas(); // Recargar lista
      },
      (error) => console.error('Error al cambiar estado del área:', error)
    );
  }
  // listar area
  listarRoles() {
    this.rolService.listarRol().subscribe(
      (roles) => this.roles = roles,
      (error) => console.error('Error al obtener rol:', error)
    );
  }

  guardarRol() {
    if (this.nuevaRol.id_rol) {
      // actualizar area
      this.rolService.actualizarRol(this.nuevaRol).subscribe(
        (response) => {
          console.log('Rol actualizado:', response);
          this.listarRoles();
        },
        (error) => console.error('Error al actualizar rol:', error)
      );
    } else {
      // registrar area
      this.rolService.registrarRol(this.nuevaRol).subscribe(
        (response) => {
          console.log('Rol registrada:', response);
          this.listarRoles();
        },
        (error) => console.error('Error al registrar rol:', error)
      );
    }
  }

  // Cambiar estado 
  cambiarEstadoRol(id: number, estado: string) {
    this.rolService.cambiarEstadoRol(id, estado).subscribe(
      (response) => {
        console.log('Estado del rol cambiado:', response);
        this.listarRoles(); // Recargar lista
      },
      (error) => console.error('Error al cambiar estado del rol:', error)
    );
  }
}






