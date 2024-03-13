const jwt = require('jwt-simple')
const moment = require('moment')

var key  =  'tocken_key'

exports.createTocken = function ( user ){
    var payload = {
        user : 'user.usuario',
        pass : 'user.password',
        iat : moment().unix(),
        ext : moment().add('5', 'minute').unix(),
    }
    return jwt.encode(payload, key);
}