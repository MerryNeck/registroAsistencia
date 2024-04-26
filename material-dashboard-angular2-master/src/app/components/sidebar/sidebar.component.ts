
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import anime from 'animejs'
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles:string[];
}
export const ROUTES: RouteInfo[] = [
  { path: '/excel', title: 'SUBIR EXCEL', icon: 'dashboard', class: '' , roles: ['admin']},
  { path: '/registro', title: 'REGISTRO DE USUARIO', icon: 'person', class: '' , roles: ['admin']},
  { path: '/area', title: 'AREA', icon: 'library_books', class: '', roles: ['admin'] },
  { path: '/rol', title: 'ROL', icon: 'library_books', class: '' , roles: ['admin']},
  { path: '/pago', title: 'PAGO', icon: 'bubble_chart', class: '', roles: ['admin'] },
  { path: '/asistencia', title: 'ASISTENCIA', icon: 'content_paste', class: '' , roles: ['admin','']},
  { path: '/anticipo', title: 'ANTICIPO', icon: 'library_books', class: '', roles: ['admin'] },
  { path: '/perfil', title: 'REGISTRO DE AUTENTIFICACION', icon: 'bubble_chart', class: '', roles: ['admin'] },

  
];
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = ROUTES;
  sidebarOpen: boolean = true;

  token :string ='';
  rol:string = '';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {
    this.rol = localStorage.getItem('rol') || ''
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeSidebar();
      }

    });
 
    this.filtrarRoles(this.rol);
   
  }
  filtrarRoles(estado: string) {
    if (estado !== 'admin') {
      this.menuItems = this.menuItems.filter(ruta => {
        return ruta.path === '/asistencia';
      });
    }
  }
 
  ngOnInit() {
    anime({
      targets: '.sidebar',
      translateX: this.sidebarOpen ? 0 : '-300px',
      duration: 300,
      easing: 'easeInOutCubic'
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSidebarWidth();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const elementoBarraLateral = this.elRef.nativeElement.querySelector('.sidebar');

    if (elementoBarraLateral) {
      anime({
        targets: elementoBarraLateral,
        translateX: this.sidebarOpen ? 0 : '-300px',
        duration: 300,
        easing: 'easeInOutCubic'
      });
    }
  }

  closeSidebar() {
    this.sidebarOpen = false;
    const elementoBarraLateral = this.elRef.nativeElement.querySelector('.sidebar');

    if (elementoBarraLateral) {
      anime({
        targets: elementoBarraLateral,
        translateX: '-250px',
        duration: 300,
        easing: 'easeInOutCubic'
      });
    }
  }

  adjustSidebarWidth() {
    const ancho = window.innerWidth <= 768 ? '200px' : '250px';
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.sidebar'), 'width', ancho);
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}