import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AreaComponent } from './area/area.component';
import { RutaexcelComponent } from './rutaexcel/rutaexcel.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { DescuentoComponent } from './descuento/descuento.component';
import { PagoComponent } from './pago/pago.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegistroComponent,
    AreaComponent,
    RutaexcelComponent,
    AsistenciaComponent,
    DescuentoComponent,
    PagoComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
