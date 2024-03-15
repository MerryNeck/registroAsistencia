import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaComponent } from './components/area/area.component';
import { RutaexcelComponent } from './components/rutaexcel/rutaexcel.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';

const routes: Routes =[
  {
    path: '',component: LoginComponent,
    //redirectTo: 'l',
    //pathMatch: 'full',
  }, {
    path: 'login',component: LoginComponent,
    //redirectTo: '',
    //pathMatch: 'full',
  }, {
   path: 'registro',component: RegistroComponent,
    /*redirectTo: '',
    pathMatch: 'full',*/
  },
  {
    path: 'rolArea',component: AreaComponent,
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
   },
    {
    //path: 'dashboard',component:DashboardComponent,
   // redirectTo: 'registro',
    //pathMatch: 'full',
  }, 
  /*{
    path: '',
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
  exports: [
  ],
})
export class AppRoutingModule { }
