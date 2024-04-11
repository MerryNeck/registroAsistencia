export class Usuario{
    constructor(
        public id_usuario:number,
        public ci:string,
        public nombre:string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public estado: string,
        public id_rol: number,
        public id_area: number,
    ){

    }
}