import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registros/registro/registro.component';
import { AppComponent } from './app.component';
import { AreaComponent } from './components/areas/area/area.component';
import { RutaexcelComponent } from './components/rutaexcel/rutaexcel.component';
import { AsistenciaComponent } from './components/asistencias/asistencia/asistencia.component';
import { AnticipoComponent } from './components/anticipos/anticipo/anticipo.component';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { BoletaComponent } from './components/boleta/boleta.component';
import { RolComponent } from './components/roles/rol/rol.component';
import { PerfilComponent } from './components/perfiles/perfil/perfil.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AnticipoEditComponent } from './components/anticipos/anticipo-edit/anticipo-edit.component';
import { AreaEditComponent } from './components/areas/area-edit/area-edit.component';
import { AsistenciaEditComponent } from './components/asistencias/asistencia-edit/asistencia-edit.component';
import { PagoEditComponent } from './components/pagos/pago-edit/pago-edit.component';
import { PerfilEditComponent } from './components/perfiles/perfil-edit/perfil-edit.component';
import { RegistroEditComponent } from './components/registros/registro-edit/registro-edit.component';
import { RolEditComponent } from './components/roles/rol-edit/rol-edit.component';
import { BoletaAnticipoComponent } from './components/boleta-anticipo/boleta-anticipo.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },

// PARA LISTAR Y REGISTRAR
  { path: 'login', component: LoginComponent, },
  { path: 'registro', component: RegistroComponent, },
  { path: 'area', component: AreaComponent, },
  { path: 'rol', component: RolComponent, },
  { path: 'excel', component: RutaexcelComponent, },
  { path: 'asistencia', component: AsistenciaComponent, },
  { path: 'anticipo', component: AnticipoComponent, },
  { path: 'pago', component: PagoComponent, },
  { path: 'boleta', component: BoletaComponent, },
  { path: 'perfil', component: PerfilComponent, },
  { path: 'boleta-anticipo', component: BoletaAnticipoComponent, },
  { path: 'sin', component: SidebarComponent, },

// PARA EDITAR
  { path: 'editar-anticipo/:id', component: AnticipoEditComponent,}, 
  { path: 'editar-area/:id', component: AreaEditComponent,},
  { path: 'editar-asistencia/:id', component: AsistenciaEditComponent,},
   { path: 'editar-pago/:id', component: PagoEditComponent,}, 
   {path: 'editar-perfil/:id', component: PerfilEditComponent,}, 
    { path: 'editar-registro/:id', component: RegistroEditComponent,}, 
    {path: 'editar-rol/:id', component: RolEditComponent,},
    
  {
    
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      // useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule
  ],
})
export class AppRoutingModule { }
