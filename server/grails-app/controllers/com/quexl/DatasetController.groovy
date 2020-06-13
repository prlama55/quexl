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
class DatasetController {

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
    def save(Dataset dataset) {
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
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        datasetService.delete(id)

        render status: NO_CONTENT
    }
}
