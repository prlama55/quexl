package com.quexl.utilities

import com.quexl.security.User
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.SpringSecurityService

@Transactional
class UtilityService {

    SpringSecurityService springSecurityService

    User getCurrentUser() {
        if (springSecurityService.isLoggedIn()) {
            return User.findById(springSecurityService.principal.id)
        } else {
            return null
        }
    }

}
