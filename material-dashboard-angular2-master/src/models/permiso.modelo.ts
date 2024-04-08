export class Permiso{
    constructor(
        public id_permiso:number,
        public fecha:string,
        public min_permiso: string,
        public detalle:string,
        public id_usuario: number,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public estado: string,
    ){

    }
}