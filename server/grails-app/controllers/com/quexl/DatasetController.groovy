package com.quexl

import com.quexl.security.User
import com.quexl.utilities.UtilityService
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
class DatasetController {
    UtilityService utilityService

    DatasetService datasetService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {

        params.max = Math.min(max ?: 10, 100)
        respond datasetService.list(params), model:[datasetCount: datasetService.count()]
    }

    def show(Long id) {
        respond datasetService.get(id)
    }

    @Transactional
    def save() {
        User user= utilityService.currentUser
        request.JSON.buyer=user
        Dataset dataset= new Dataset(request.JSON)
        println "testing 11"
        if (dataset == null) {
            render status: NOT_FOUND
            return
        }
        if (dataset.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond dataset.errors
            return
        }

        try {
            datasetService.save(dataset)
        } catch (ValidationException e) {
            respond dataset.errors
            return
        }

        respond dataset, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Dataset dataset) {
        if (dataset == null) {
            render status: NOT_FOUND
            return
        }
        if (dataset.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond dataset.errors
            return
        }

        try {
            datasetService.save(dataset)
        } catch (ValidationException e) {
            respond dataset.errors
            return
        }

        respond dataset, [status: OK, view:"show"]
    }

    @Transactional
    def delete(String id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        datasetService.delete(id)

        render status: NO_CONTENT
    }
}
