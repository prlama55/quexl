package quexl

class UrlMappings {

    static mappings = {

        "/api/users"(resources:'user')
        "/api/services"(resources:'resource')
        "/api/dataset"(resources:'dataset')
        "/api/historyElements"(resources:'historyElement')
        "/api/histories"(resources:'history')
        "/api/userServices"(resources:'userService')

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
