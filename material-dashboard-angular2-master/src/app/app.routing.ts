import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AppComponent } from './app.component';
import { AreaComponent } from './components/area/area.component';
import { RutaexcelComponent } from './components/rutaexcel/rutaexcel.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { AnticipoComponent } from './components/anticipo/anticipo.component';
import { PagoComponent } from './components/pago/pago.component';
import { BoletaComponent } from './components/boleta/boleta.component';

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
   path: 'registro',component: RegistroComponent,
    /*redirectTo: '',
    pathMatch: 'full',*/
  },
  {
    path: 'areaRol',component: AreaComponent,
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
     /*redirectTo: '',
     pathMatch: 'full',*/
   }, {
    path: 'pago',component: PagoComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
   },
   {
    path: 'boleta',component: BoletaComponent,
     /*redirectTo: '',
     pathMatch: 'full',*/
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
