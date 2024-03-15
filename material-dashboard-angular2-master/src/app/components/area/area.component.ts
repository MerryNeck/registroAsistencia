import { Component, OnInit } from '@angular/core';
import { AreaService } from 'services/area.service';
import { RolService } from 'services/rol.service';



@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit{

  areas: any[] = [];
  nuevaArea: any = {};
  roles: any[] = [];
  nuevaRol: any = {};

  constructor(private areaService: AreaService, private rolService: RolService) { }

  ngOnInit(): void {
    this.listarAreas();
  }
  onSubmit() {
    //REGISTRAR NUEVO AREA
    this.areaService.insert_area(this.nuevaArea)
      .subscribe(
        response => {
          console.log('Area registrada:', response);
          
        },
        error => {
          console.error('Error registrar area:', error);
          
        }
      );
      //EDITAR UN AREA 
      this.areaService.update_area(this.areas)
      .subscribe(
        response => {
          console.log('Area actualizada:', response);
          
        },
        error => {
          console.error('Error actualizar area:', error);
          
        }
      );
      //REGISTRAR NUEVO ROL
    this.rolService.insert_rol(this.nuevaArea)
    .subscribe(
      response => {
        console.log('Rol registrada:', response);
        
      },
      error => {
        console.error('Error registrar rol:', error);
        
      }
    );
    //EDITAR UN ROL
    this.rolService.update_rol(this.areas)
    .subscribe(
      response => {
        console.log('Rol actualizada:', response);
        
      },
      error => {
        console.error('Error actualizar area:', error);
        
      }
    );

  }
  
  listarAreas() {
    this.areaService.get_idArea(null).subscribe(data => { 
      this.areas = data;
    });
  }

  desactivarArea(idArea: number, estado: string) {
    this.areaService.desactivarArea(idArea, estado).subscribe(data => {
    });
  }
  listarRoles() {
    this.rolService.get_idRol(null).subscribe(data => { 
      this.areas = data;
    });
  }

  desactivarRol(idRol: number, estado: string) {
    this.rolService.desactivarRol(idRol, estado).subscribe(data => {
    });
  }
}
