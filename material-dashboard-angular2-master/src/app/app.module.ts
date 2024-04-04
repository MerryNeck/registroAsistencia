import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RutaexcelComponent } from './components/rutaexcel/rutaexcel.component';
import { RolComponent } from './components/rol/rol.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
   // FormsModule,

  ],
  declarations: [
    //LoginComponent,
    AppComponent,
    AdminLayoutComponent,
    //RolComponent,
   // RutaexcelComponent,
    //AsistenciaComponent,
    //RegistroExcelComponent,
    //AreaComponent,  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
