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
    /*PagoEditComponent,
    PerfilEditComponent,
    PermisoEditComponent,
    RegistroEditComponent,
    RolEditComponent,
    AsistenciaEditComponent,*/
   // AreaEditComponent,
   // RutaexcelComponent,
    //AsistenciaComponent,
    //RegistroExcelComponent,
    //AreaComponent,  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
