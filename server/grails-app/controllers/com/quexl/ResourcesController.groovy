package com.quexl

import com.quexl.security.User
import com.quexl.utilities.UtilityService
import grails.converters.JSON
import grails.validation.ValidationException
import org.springframework.security.access.annotation.Secured

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@Secured('permitAll')
@ReadOnly
class ResourcesController {
    UtilityService utilityService
    ResourcesService resourcesService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        println "max = $max"
        params.max = Math.min(max ?: 100, 1000)
        def list= resourcesService.list(params)
        render list as JSON
    }

    def show(String id) {
        respond resourcesService.get(id)
    }

    @Transactional
    def save() {
        User user= utilityService.currentUser
        request.JSON.seller=user
        Resources resources= new Resources(request.JSON)
        if (user == null) {
            render status: NOT_FOUND
            return
        }
        if (resources.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond resources.errors
            return
        }

        try {
            resourcesService.save(resources)
        } catch (ValidationException e) {
            respond resources.errors
            return
        }

        render resources as JSON
    }

    @Transactional
    def update(Resources resources) {
        if (resources == null) {
            render status: NOT_FOUND
            return
        }
        if (resources.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond resources.errors
            return
        }

        try {
            resourcesService.save(resources)
        } catch (ValidationException e) {
            respond resources.errors
            return
        }

        render resources as JSON
    }

    @Transactional
    def delete(String id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        resourcesService.delete(id)

        render status: NO_CONTENT
    }
}
