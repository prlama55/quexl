package com.quexl

import grails.gorm.services.Service

@Service(UserServices)
interface UserServiceService {

    UserServices get(String id)

    List<UserServices> list(Map args)

    Long count()

    void delete(String id)

    UserServices save(UserServices userService)

}
