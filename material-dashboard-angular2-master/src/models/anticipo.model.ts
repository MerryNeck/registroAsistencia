export class Anticipo{
    constructor(
      public id_anticipo: number,
      public fecha_creacion: string,
      public fecha_modificacion: string,
      public estado: string,
      public anticipos: number,
      public id_usuario: number,
    ) {
    }
  }