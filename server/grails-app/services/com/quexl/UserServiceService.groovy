package com.quexl

import grails.gorm.services.Service

@Service(UserService)
interface UserServiceService {

    UserService get(String id)

    List<UserService> list(Map args)

    Long count()

    void delete(String id)

    UserService save(UserService userService)

}
