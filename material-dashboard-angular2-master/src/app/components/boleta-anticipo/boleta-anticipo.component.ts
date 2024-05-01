import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anticipo } from 'models/anticipo.model';
import { BoletaService } from 'services/boleta.service';
import * as printJS from 'print-js';
import html2canvas from 'html2canvas';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-boleta-anticipo',
  templateUrl: './boleta-anticipo.component.html',
  styleUrls: ['./boleta-anticipo.component.css']
})
export class BoletaAnticipoComponent implements OnInit {
  boletas: Anticipo[] = [];
  boletaSeleccionada: Anticipo | null = null;

  public res: any;
  public boletaAnticipo: any;
  token: string = '';
  ciBusqueda: string = '';
  fechaBusqueda: string = '';
  rutaRol: string = '';

  constructor( private anticipoService: BoletaService, private router: Router) {
    this.token = localStorage.getItem('token') || '';
    this.rutaRol = localStorage.getItem('rol') || '';
    if (this.token === '' && this.rutaRol === '') {
      this.router.navigate(['/login'])
    } else if (this.rutaRol !== 'admin') {
      this.router.navigate(['/asistencia'])
    } else {
      this.listarBoletas();
    }
   }

  ngOnInit(): void {
  }
  listarBoletas(): void {
    this.anticipoService.getBoletas(this.token, this.rutaRol)
      .subscribe((response) => {
        this.res = response
        if (this.res.ok) {
          this.boletaAnticipo = this.res.data;
        } else {
        }
        error => Swal.fire('Error', 'No se pudieron obtener los datos de asistencia', 'error')
      });
  }

  seleccionarBoleta(anticipo: Anticipo): void {
    this.boletaSeleccionada = anticipo;
  }


  imprimirPantalla() {
    const elemento = document.getElementById('capturar');

    html2canvas(elemento).then(canvas => {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.transform = 'translate(-20%, -20%)';
      canvas.style.marginTop = '10%';
      const imageData = canvas.toDataURL('image/png');

      printJS({
        printable: imageData,
        type: 'image',
        style: '@media print { body { background-color: transparent; } }'
      });
    });
  }

  buscarBoleta(): void {
    console.log(this.ciBusqueda);

    this.anticipoService.buscarPorCiOFecha(this.ciBusqueda, this.fechaBusqueda, this.token, this.rutaRol)
      .subscribe((response) => {
        this.res = response
        this.boletaAnticipo = this.res.data;
        console.log(this.boletaAnticipo);

      }, error => {
        console.error('Error al buscar asistencias:', error);
        Swal.fire('Error', 'Ingrese los Datos Correctos', 'error');

      });
    this.ciBusqueda = '';
    this.fechaBusqueda = '';
  }
}
