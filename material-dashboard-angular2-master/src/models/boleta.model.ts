export class Boleta {
  constructor(
    public id: number,
    public periodoPago: string,
    public fechaPago: string,
    public id_pago:number,
    public id_asistencia: number,
    public liquidoPagable: number,
    public fecha_creacion:string,
    public fecha_modificacion:string,
    public estado:string
  ) {}
}