export class Asistencia{
    constructor(
        public id_asistencia:number,
        public departamento:string,
        public fecha: string,
        public id_excel: number,
        public tprano_ingreso:string,
        public tde_ingreso:string,
        public min_retardos: string,
        public min_adelantado: string,
        public faltas: string,
        public total_horas: string,
        public tprano_salida:string,
        public tde_salida:string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public estado: string,
        public pago: number,
        public id_usuario:number,
    ){

    }
}