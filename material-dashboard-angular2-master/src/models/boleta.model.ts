/*export class Boleta {
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
}*/
export class Boleta {
  constructor(
    public id: number,
    public id_usuario: number,
    public id_area: number,
    public periodoPago: string,
    public fechaPago: string,
    public id_pago:number,
    public id_asistencia: number,
    public minutosNoTrabajados: number,
    public liquidoPagable: number,
    public fecha_creacion:string,
    public fecha_modificacion:string,
    public estado:string
  ) {}
}