import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/excel', title: 'SUBIR EXCEL', icon: 'person', class: '' },
  { path: '/regisusuario', title: 'REGISTRO DE USUARIO', icon: 'person', class: '' },
  { path: '/area', title: 'AREA', icon: 'library_books', class: '' },
  { path: '/rol', title: 'ROL', icon: 'library_books', class: '' },
  { path: '/pago', title: 'PAGO', icon: 'dashboard', class: '' },
  { path: '/asistencia', title: 'ASISTENCIA', icon: 'content_paste', class: '' },
  { path: '/anticipo', title: 'ANTICIPO', icon: 'library_books', class: '' },
  { path: '/perfil', title: 'REGISTRO DE AUTENTIFICACION', icon: 'bubble_chart', class: '' },
  { path: '/permiso', title: 'PERMISO', icon: 'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  sidebarVisible = true;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  toggleSidebar() { // Función para alternar la visibilidad del sidebar
    this.sidebarVisible = !this.sidebarVisible;
  }
  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
