package com.quexl.security

import grails.gorm.services.Service

@Service(User)
interface IUserService {

    User get(String id)

    List<User> list(Map args)

    Long count()

    User delete(String id)

    User save(User user)

}
