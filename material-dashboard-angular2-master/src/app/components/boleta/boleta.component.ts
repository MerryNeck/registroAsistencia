import { Component, OnInit } from '@angular/core';
import { Boleta } from 'models/boleta.model';
import { BoletaService } from 'services/boleta.service';
import { HttpClient } from '@angular/common/http';
import * as printJS from 'print-js';
import html2canvas from 'html2canvas';
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
    mes: 'Enero',
    fecha: '2024/01/02',
    pagos: '300'
  }]
 boleta=[{
  pago: '4000',
  afps: '150',
  atrasos: '480',
  faltas: '1',
  mnr: '480',
  descuentos:'200',
}]
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
imprimirPantalla() {
  const elemento = document.getElementById('capturar');

  html2canvas(elemento).then(canvas => {
    canvas.style.width = '100%';
    canvas.style.height='100%';
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
