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
class HistoryElementController {

    HistoryElementService historyElementService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond historyElementService.list(params), model:[historyElementCount: historyElementService.count()]
    }

    def show(String id) {
        respond historyElementService.get(id)
    }

    @Transactional
    def save(HistoryElement historyElement) {
        if (historyElement == null) {
            render status: NOT_FOUND
            return
        }
        if (historyElement.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond historyElement.errors
            return
        }

        try {
            historyElementService.save(historyElement)
        } catch (ValidationException e) {
            respond historyElement.errors
            return
        }

        respond historyElement, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(HistoryElement historyElement) {
        if (historyElement == null) {
            render status: NOT_FOUND
            return
        }
        if (historyElement.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond historyElement.errors
            return
        }

        try {
            historyElementService.save(historyElement)
        } catch (ValidationException e) {
            respond historyElement.errors
            return
        }

        respond historyElement, [status: OK, view:"show"]
    }

    @Transactional
    def delete(String id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        historyElementService.delete(id)

        render status: NO_CONTENT
    }
}
