export class Descuento {
    constructor(
      public id_descuento: number,
      public fecha_creacion: string,
      public fecha_modificacion: string,
      public estado: string,
      public anticipos: number,
      public id_reporte: number,
      public min_atrasados: number,
      public faltas: number,
    ) {
    }
  }