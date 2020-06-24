package com.quexl.security

import grails.validation.ValidationException
import org.springframework.security.access.annotation.Secured

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class UserController {

    IUserService userService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    @Secured(["ROLE_ADMIN", 'ROLE_SUPER_ADMIN'])
    def index(Integer max) {
        params.max = Math.min(max ?: 100, 100)
        respond userService.list(params), model:[userCount: userService.count()]
    }

    def show(String id) {
        respond userService.get(id)
    }

    @Transactional
    @Secured("permitAll")
    def save(User user) {
        try {
            user.primaryRole = Roles.ROLE_ADMIN.toString()
            User newUser= userService.save(user)
            Role role= Role.findOrSaveWhere(authority: Roles.ROLE_ADMIN.toString())
            if(newUser && role){
                UserRole.create newUser, role
                UserRole.withSession {
                    it.flush()
                    it.clear()
                }
            }
        } catch (ValidationException e) {

            println "e.printStackTrace() = "+e.printStackTrace()
            respond user.errors
            return
        }

        respond user, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }
        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors
            return
        }

        try {
            userService.save(user)
        } catch (ValidationException e) {
            respond user.errors
            return
        }

        respond user, [status: OK, view:"show"]
    }

    @Transactional
    def delete(String id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        userService.delete(id)

        render status: NO_CONTENT
    }
}
