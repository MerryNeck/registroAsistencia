import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import anime from 'animejs';
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
  menuItems: RouteInfo[] = ROUTES;
  sidebarOpen: boolean = true;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeSidebar();
      }
    });
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
        translateX: '-280px',
        duration: 300,
        easing: 'easeInOutCubic'
      });
    }
  }

  adjustSidebarWidth() {
    const ancho = window.innerWidth <= 768 ? '200px' : '300px';
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.sidebar'), 'width', ancho);
  }
}