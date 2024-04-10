// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   backend: {
    api: 'http://localhost:5052/',
    login: '/api/login',
    area: '/api/area',
    rol: '/api/rol',
    anticipo: '/api/anticipo',
    pago: '/api/pago',
    perfil: '/api/perfil',
    permiso: '/api/permiso',
    usuario: 'api/regisusuario',
    asistencia: '/api/asistencia',
    boleta: 'api/boleta',
    excel: 'api/excel'
  }
  
};
