// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   backend: {
    api: 'http://localhost:5052/api',
    login: '/api/login',
    area: '/api/area',
    rol: '/api/rol',
    anticipo: '/api/anticipo',
    

  }
  
};
