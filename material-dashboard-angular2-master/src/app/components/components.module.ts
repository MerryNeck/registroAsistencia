import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app.routing'; 
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registros/registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AreaComponent } from './areas/area/area.component';
import { RutaexcelComponent } from './rutaexcel/rutaexcel.component';
import { AsistenciaComponent } from './asistencias/asistencia/asistencia.component';
import { PagoComponent } from './pagos/pago/pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoletaComponent } from './boleta/boleta.component';
import { AnticipoComponent } from './anticipos/anticipo/anticipo.component';
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { RolComponent } from './roles/rol/rol.component';
import { AnticipoEditComponent } from './anticipos/anticipo-edit/anticipo-edit.component';
import { AreaEditComponent } from './areas/area-edit/area-edit.component';
import { PagoEditComponent } from './pagos/pago-edit/pago-edit.component';
import { PerfilEditComponent } from './perfiles/perfil-edit/perfil-edit.component';
import { RegistroEditComponent } from './registros/registro-edit/registro-edit.component';
import { RolEditComponent } from './roles/rol-edit/rol-edit.component';
import { AsistenciaEditComponent } from './asistencias/asistencia-edit/asistencia-edit.component';
import { BoletaAnticipoComponent } from './boleta-anticipo/boleta-anticipo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    HttpClientModule,
    
    AppRoutingModule,
  ],
  declarations: [
    SidebarComponent,
    LoginComponent,
    RegistroComponent,
    AreaComponent,
    RutaexcelComponent,
    AsistenciaComponent,
   
    PagoComponent,
    BoletaComponent,
    AnticipoComponent,
    PerfilComponent,
    RolComponent,
    AnticipoEditComponent,
    AreaEditComponent,
    PagoEditComponent,
    PerfilEditComponent,
    RegistroEditComponent,
    RolEditComponent,
    AsistenciaEditComponent,
    BoletaAnticipoComponent,
  ],
  exports: [
    SidebarComponent
  ]
})
export class ComponentsModule { }
