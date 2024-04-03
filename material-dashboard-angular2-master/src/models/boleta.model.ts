export class Boleta {
    constructor(
      public nro_boleta: number,
      public pago_total: number,
      public id_sueldo: number,
      public observacion: string,
      public fecha_creacion: string,
      public fecha_modificacion: string,
      public estado: string,
    ) {
    }
  }