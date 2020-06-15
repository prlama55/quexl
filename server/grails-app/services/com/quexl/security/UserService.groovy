package com.quexl.security

import grails.gorm.services.Service

@Service(User)
interface UserService {

    User get(String id)

    List<User> list(Map args)

    Long count()

    void delete(String id)

    User save(User user)

}
