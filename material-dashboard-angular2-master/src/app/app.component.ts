import { Component} from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = (event.url === '/regisusuario' 
        || event.url === '/area' || event.url === '/rol'
        || event.url === '/excel' || event.url === '/asistencia'
        || event.url === '/anticipo' || event.url === '/pago'
        || event.url === '/perfil' || event.url === '/permiso'
        || event.url === '/editar-area/:id' || event.url === '/editar-rol/:id'
        || event.url === '/editar-asistencia/:id' || event.url === '/editar-registro/:id' 
        || event.url === '/editar-anticipo/:id' || event.url === '/editar-pago/:id'
        || event.url === '/editar-perfil/:id' || event.url === '/editar-permiso/:id');
      }
      
    });
  }
}
