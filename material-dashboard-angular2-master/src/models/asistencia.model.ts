export class Asistencia{
    constructor(
        public id_asistencia:number,
        public fecha: string,
        public id_excel: number,
        public tprano_ingreso:string,
        public tde_ingreso:string,
        public min_retardo: string,
        public min_adelantado: string,
        public faltas: string,
        public total_horas: string,
        public tprano_salida:string,
        public tde_salida:string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public estado: string,
        public id_usuario:number,
        public min_extra:string,
        public hrs_no_recuperadas:string,
        public usuario_id :number,
    ){

    }
}