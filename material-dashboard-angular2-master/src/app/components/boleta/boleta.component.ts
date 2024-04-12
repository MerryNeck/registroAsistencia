import { Component, OnInit } from '@angular/core';
import { Boleta } from 'models/boleta.model';
import { BoletaService } from 'services/boleta.service';
import { HttpClient } from '@angular/common/http';
import * as printJS from 'print-js';
import html2canvas from 'html2canvas';

import Swal from 'sweetalert2';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {

  boletas: Boleta[] = [];
  boletaSeleccionada: Boleta | null = null;

  public res: any;
  public boletaUser: any;
  token: string = '';

  constructor(private boletaService: BoletaService, private http: HttpClient) { }

  ngOnInit(): void {
    this.listarBoletas();
  }

  listarBoletas(): void {
    this.boletaService.getBoletas(this.token)
      .subscribe((response) => {
        this.res = response
        if (this.res.ok) {
          this.boletaUser = this.res.data;
        } else {
        }
        error => Swal.fire('Error', 'No se pudieron obtener los datos de asistencia', 'error')
      });
  }

  seleccionarBoleta(boleta: Boleta): void {
    this.boletaSeleccionada = boleta;
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

}
