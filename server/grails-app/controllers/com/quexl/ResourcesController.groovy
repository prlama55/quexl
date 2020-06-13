package com.quexl

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class ResourcesController {

    ResourcesService resourcesService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond resourcesService.list(params), model:[resourcesCount: resourcesService.count()]
    }

    def show(Long id) {
        respond resourcesService.get(id)
    }

    @Transactional
    def save(Resources resources) {
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

        respond resources, [status: CREATED, view:"show"]
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

        respond resources, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        resourcesService.delete(id)

        render status: NO_CONTENT
    }
}
