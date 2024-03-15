export class Boleta {
    constructor(
      public nro_boleta: number,
      public liquido_pagable: number,
      public id_asistencia: number,
      public observacion: string,
      public fecha_creacion: string,
      public fecha_modificacion: string,
      public estado: string,
    ) {
    }
  }