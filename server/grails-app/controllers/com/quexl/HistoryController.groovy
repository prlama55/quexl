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

@ReadOnly
@Secured(["ROLE_ADMIN", 'ROLE_SUPER_ADMIN'])
class HistoryController {
  UtilityService utilityService
  IHistoryService historyService

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

  def index(Integer max) {
    params.max = Math.min(max ?: 100, 100)
    def histories = historyService.list(params)
    render histories as JSON
  }

  def show(String id) {
    History history = historyService.get(id)
    if (history == null) {
      render status: NOT_FOUND
      return
    }
    render history as JSON
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

    render history as JSON
  }

  @Transactional
  def update() {
    User user = utilityService.currentUser
    History history = History.findById(params.id)
    if (history == null) {
      render status: NOT_FOUND
      return
    }
    if (history.hasErrors()) {
      transactionStatus.setRollbackOnly()
      respond history.errors
      return
    }
    history.properties = request.JSON
    history.updatedBy = user
    try {
      historyService.save(history)
    } catch (ValidationException e) {
      respond history.errors
      return
    }

    render history as JSON
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
