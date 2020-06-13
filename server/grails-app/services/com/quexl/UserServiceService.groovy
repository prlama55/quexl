package com.quexl

import grails.gorm.services.Service

@Service(UserService)
interface UserServiceService {

    UserService get(Serializable id)

    List<UserService> list(Map args)

    Long count()

    void delete(Serializable id)

    UserService save(UserService userService)

}