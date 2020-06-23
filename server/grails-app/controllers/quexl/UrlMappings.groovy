package quexl

class UrlMappings {

  static mappings = {

    "/api/users"(resources: 'user')
    "/api/services"(resources: 'userService')
    "/api/datasets"(resources: 'dataset')
    "/api/histories"(resources: 'history')
    "500"(view: '/error')
    "404"(view: '/notFound')
  }
}
