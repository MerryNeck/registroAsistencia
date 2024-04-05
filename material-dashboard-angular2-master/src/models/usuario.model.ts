export class Usuario{
    constructor(
        public id_usuario:number,
        public nombre:string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public ci:string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public estado: string,
        public id_rol: number,
        public id_area: number,
    ){

    }
}