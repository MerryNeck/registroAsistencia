export class Excel {
    constructor(
      public id_excel: number,
      public ruta_excel: string[] | File[], 
      public fecha_creacion: string,
      public fecha_modificacion: string,
      public estado: string,
    ) {
    }
  }