import { Component, HostListener, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/excel', title: 'SUBIR EXCEL', icon: 'dashboard', class: '' },
  { path: '/regisusuario', title: 'REGISTRO DE USUARIO', icon: 'person', class: '' },
  { path: '/area', title: 'AREA', icon: 'library_books', class: '' },
  { path: '/rol', title: 'ROL', icon: 'library_books', class: '' },
  { path: '/pago', title: 'PAGO', icon: 'bubble_chart', class: '' },
  { path: '/asistencia', title: 'ASISTENCIA', icon: 'content_paste', class: '' },
  { path: '/anticipo', title: 'ANTICIPO', icon: 'library_books', class: '' },
  { path: '/perfil', title: 'REGISTRO DE AUTENTIFICACION', icon: 'bubble_chart', class: '' },
  { path: '/permiso', title: 'PERMISO', icon: 'content_paste', class: '' },

  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = ROUTES;
  sidebarVisible:boolean = true;
  isMobile : boolean =false;
  showSidebar: boolean = true;

   constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeSidebar();
      }
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.isMobile = this.isMobileMenu();
  }
  toggleSidebar() { 
      this.sidebarVisible = !this.sidebarVisible;
      this.showSidebar = !this.showSidebar;
  }
  closeSidebar() {
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }
  isMobileMenu() {
    return window.innerWidth <= 991;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.isMobileMenu();
  }
}
