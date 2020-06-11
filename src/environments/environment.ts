// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_fpcore_maestros_host: window["env"] ? window["env"]["api_fpcore_maestros_host"] || "http://localhost:8080" : "http://localhost:8080",
  product_api_v1_base_resource: "/api/maestros/v1/product/",
  id_generator_api_v1_base_resource: "/api/maestros/v1/idgenerator/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
