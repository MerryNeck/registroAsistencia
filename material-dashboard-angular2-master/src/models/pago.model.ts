export class Pago {
    constructor(
      public id_sueldo: number,
      public fecha_creacion: string,
      public fecha_modificacion: string,
      public estado: string,
      public dias_trabajado: number,
      public retencion: number,
      public sueldo: number,
      public sueldo_bruto: number,
      public id_usuario: number,
    ) {
    }
  }