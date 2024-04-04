import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app.routing'; 
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AreaComponent } from './area/area.component';
import { RutaexcelComponent } from './rutaexcel/rutaexcel.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { PagoComponent } from './pago/pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoletaComponent } from './boleta/boleta.component';
import { AnticipoComponent } from './anticipo/anticipo.component';
import { RolComponent } from './rol/rol.component';

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
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegistroComponent,
    AreaComponent,
    RutaexcelComponent,
    AsistenciaComponent,
    RolComponent,
    PagoComponent,
    BoletaComponent,
    AnticipoComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
