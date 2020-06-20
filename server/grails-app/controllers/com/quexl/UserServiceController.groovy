package com.quexl

import grails.validation.ValidationException
import org.springframework.security.access.annotation.Secured

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
@Secured(["ROLE_ADMIN", 'ROLE_SUPER_ADMIN'])
class UserServiceController {

    UserServiceService userServiceService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond userServiceService.list(params), model:[userServiceCount: userServiceService.count()]
    }

    def show(String id) {
        respond userServiceService.get(id)
    }

    @Transactional
    def save(UserServices userService) {
        if (userService == null) {
            render status: NOT_FOUND
            return
        }
        if (userService.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond userService.errors
            return
        }

        try {
            userServiceService.save(userService)
        } catch (ValidationException e) {
            respond userService.errors
            return
        }

        respond userService, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(UserServices userService) {
        if (userService == null) {
            render status: NOT_FOUND
            return
        }
        if (userService.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond userService.errors
            return
        }

        try {
            userServiceService.save(userService)
        } catch (ValidationException e) {
            respond userService.errors
            return
        }

        respond userService, [status: OK, view:"show"]
    }

    @Transactional
    def delete(String id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        userServiceService.delete(id)

        render status: NO_CONTENT
    }
}
