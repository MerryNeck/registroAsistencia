export class Boleta {
  constructor(
    public id: number,
    public nombre: string,
    public ocupacion: string,
    public diasTrabajados: number,
    public periodoPago: number,
    public fechaPago: string,
    public pago: number,
    public descuentoAfps: number,
    public atrasos: number,
    public faltas: number,
    public minutosNoTrabajados: number,
    public liquidoPagable: number
  ) {}
}