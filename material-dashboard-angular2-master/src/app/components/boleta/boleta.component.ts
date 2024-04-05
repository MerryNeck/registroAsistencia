import { Component, OnInit } from '@angular/core';
import { Boleta } from 'models/boleta.model';
import { BoletaService } from 'services/boleta.service';
import { HttpClient } from '@angular/common/http';
import * as printJS from 'print-js';
@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {

  boletas: Boleta[] = [];
  boletaSeleccionada: Boleta | null = null;

  info=[{
    nombre: 'miriam sonia justo mamani',
    ocupacion: 'pasante',
    dias_laborales: '30',
    mes_pago: '0',
    fecha: '20240102',
    pago: 300
  }]
 boleta=[{
  pago: 200,
  afps: 150,
  faltas: '1',
  minutos_no_repuestos: '480',
  descuento:'200',
}]
/*boleta1=[{
  id : 1,
  pago: 200,
  afps: 150,
  faltas: '1',
  minutos_no_repuestos: '480',
  descuento_no_repuesto:'200',
}]*/

  constructor(private boletaService: BoletaService, private http: HttpClient) { }

  ngOnInit(): void {
    this.listarBoletas();
  }

  listarBoletas(): void {
    this.boletaService.getBoletas()
      .subscribe(boletas => this.boletas = boletas);
  }

  seleccionarBoleta(boleta: Boleta): void {
    this.boletaSeleccionada = boleta;
  }


  actualizarBoleta(): void {
    if (this.boletaSeleccionada) {
      this.boletaService.updateBoleta(this.boletaSeleccionada)
        .subscribe(() => this.listarBoletas());
    }
  }
/*  imprimirBoleta(): void {
    const url = 'http://localhost:3000/api/asistencias/pdf'; // Reemplaza con la URL correcta de tu servidor

    this.http.get(url, { responseType: 'blob' })
      .subscribe((pdfBlob: Blob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      }, (error) => {
        console.error('Error al obtener el PDF de asistencias:', error);
      });
  }
*/
  imprimir() :void{
    printJS({ printable: 'app-root', type: 'html' });

  }
}
