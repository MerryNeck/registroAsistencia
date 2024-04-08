import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
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
import { PermisoComponent } from './components/permisos/permiso/permiso.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AnticipoEditComponent } from './components/anticipos/anticipo-edit/anticipo-edit.component';


const routes: Routes =[
  {
    path: '',component: LoginComponent,
    //redirectTo: 'l',
    //pathMatch: 'full',
  }, {
    path: 'login',component: LoginComponent,
    //redirectTo: 'login',
    //pathMatch: 'full',
  }, {
   path: 'regisusuario',component: RegistroComponent,
    /*redirectTo: '',
    pathMatch: 'full',*/
  },
  {
    path: 'area',component: AreaComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'rol',component: RolComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'excel',component: RutaexcelComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   }, {
    path: 'asistencia',component: AsistenciaComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'anticipo',component: AnticipoComponent,
     
   }, {
    path: 'pago',component: PagoComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },
   {
    path: 'boleta',component: BoletaComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'perfil',component: PerfilComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'permiso',component: PermisoComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'sin',component: SidebarComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },{
    path: 'editar-anticipo/:id',component: AnticipoEditComponent,
     
   },{
    path: 'editar-area/:id',component: AnticipoEditComponent,
     
   },{
    path: 'editar-pago/:id',component: AnticipoEditComponent,
     
   },{
    path: 'editar-perfil/:id',component: AnticipoEditComponent,
     
   },{
    path: 'editar-permiso/:id',component: AnticipoEditComponent,
     
   },{
    path: 'editar-registro/:id',component: AnticipoEditComponent,
     
   },{
    path: 'editar-rol/:id',component: AnticipoEditComponent,
     
   },
    {
    //path: 'dashboard',component:DashboardComponent,
   // redirectTo: 'registro',
    //pathMatch: 'full',
  }, 
 /* {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
     path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]}*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      // useHash: true
    })
  ],
  providers: [],
  bootstrap:[AppComponent],
  exports: [ RouterModule
  ],
})
export class AppRoutingModule { }
