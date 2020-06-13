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
class HistoryController {

    HistoryService historyService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond historyService.list(params), model:[historyCount: historyService.count()]
    }

    def show(String id) {
        respond historyService.get(id)
    }

    @Transactional
    def save(History history) {
        if (history == null) {
            render status: NOT_FOUND
            return
        }
        if (history.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond history.errors
            return
        }

        try {
            historyService.save(history)
        } catch (ValidationException e) {
            respond history.errors
            return
        }

        respond history, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(History history) {
        if (history == null) {
            render status: NOT_FOUND
            return
        }
        if (history.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond history.errors
            return
        }

        try {
            historyService.save(history)
        } catch (ValidationException e) {
            respond history.errors
            return
        }

        respond history, [status: OK, view:"show"]
    }

    @Transactional
    def delete(String id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        historyService.delete(id)

        render status: NO_CONTENT
    }
}
