export const environment = {
  production: true,
  api_fpcore_maestros_host: window["env"]["api_fpcore_maestros_host"] || "http://localhost:8080",
  product_api_v1_base_resource: "/api/maestros/v1/product/",
  id_generator_api_v1_base_resource: "/api/maestros/v1/idgenerator/"
};
