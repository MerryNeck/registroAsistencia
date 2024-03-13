// importamos response y request de express
const { request = req, response =res } = require('express');
//importamos modelo
//const {Login} = require('../../models/login.model');
const pool = require('./../../database/db')
class controllerLogin{
    static async loginUser(req, res){
        try {
            ///console.log(req.body);
            const data = req.body;
            if (data.email == null && data.password == null ) {
                return(res.status(404).json({
                    message : 'no existe datos'
            }))
        }
            const query = `SELECT
            u.nombre,
            u.apellido_paterno,
            r.tipo,
            ar.tipo_area 
          FROM usuario AS u
          INNER JOIN autentificacion  AS a ON a.id_usuario  = u.id_usuario
          INNER JOIN rol as r on u.id_usuario =r.id_usuario 
          inner join area as ar on u.id_usuario = ar.id_usuario 
          WHERE a.estado = 's' 
          AND a.correo_corp = $1
          AND a.password = $2;`
           const values = [data.email, data.password]
           const result = await pool.query(query,values)
           if (result.rows.length ==0 ) {
                return(res.status(404).json({
                    message : false
           }))
           }
           //console.log(result.rows);
           res.status(200).send({
            data : result.rows
           })
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = controllerLogin