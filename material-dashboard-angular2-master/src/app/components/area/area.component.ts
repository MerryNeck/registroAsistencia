import { Component, OnInit } from '@angular/core';
import { Area } from 'models/area.model';
import { AreaService } from 'services/area.service';
import { Rol } from 'models/rol.model';
import { RolService } from 'services/rol.service';
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

  nuevoRol: Rol = new Rol(0, '', '', '', '');
  roles: Rol[] = [];
  editandoRol: Rol | null =null;

  constructor(private areaService: AreaService, private rolService: RolService, private authService:AuthService) { }

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

  listarRoles(): void {
    this.rolService.listarRol().subscribe(
      (roles) => (this.roles = roles),
      (error) => console.error('Error al obtener roles:', error)
    );
  }

  registrarNuevoRol(form:NgForm): void {
    if (form.valid) {
      const { tipo, estado } = form.value;
      this.nuevoRol.tipo = tipo;
      this.nuevoRol.estado = estado;
      this.rolService.registrarRol(this.nuevoRol)
        .subscribe(rol=> {
          this.roles.push(rol);
          this.nuevoRol = new Rol(0, '', '', '', '');
          form.reset();
        });
    }
  }

  editarRol(rol: Rol): void {
    this.editandoRol = { ...rol };
  }

  actualizarRol(valores: any): void {
    if (this.editandoRol) {
      this.rolService.actualizarRol(this.editandoRol).subscribe(
        (rol) => {
          const index = this.roles.findIndex(
            (r) => r.id_rol === rol.id_rol
          );
          this.roles[index] = rol;
          this.editandoRol = null;
        },
        (error) => console.error('Error al actualizar rol:', error)
      );
    }
  }

  cambiarEstadoRol(idRol: number, estado: string): void {
    this.rolService.cambiarEstadoRol(idRol, estado).subscribe(
      (response) => {
        console.log('Estado del rol cambiado:', response);
        this.listarRoles();
      },
      (error) =>
        console.error('Error al cambiar estado del rol:', error)
    );
  }
}






