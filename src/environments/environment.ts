// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    // production: false,
    // useAuth: false,
    // API_URL: 'http://localhost:8080',
    production: true,
    useAuth: false,
    API_URL: 'http://197.85.186.65:8080',
    HOSTED_LOCALLY: true,
    redirectURL: 'http://localhost:4200/#/home'
};
