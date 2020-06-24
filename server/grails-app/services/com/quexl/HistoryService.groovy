package com.quexl

import com.quexl.security.User
import com.quexl.utilities.UtilityService
import grails.gorm.transactions.Transactional

@Transactional
class HistoryService implements IHistoryService {

  UtilityService utilityService

  @Override
  History get(String id) {
    return History.findById(id)
  }

  @Override
  Map<String, History[]> list(Map args) {
    Map<String, History[]> mapHistories = [:]
    User currentUser = utilityService.currentUser
    if (!currentUser) {
      mapHistories.sellerHistory = []
      mapHistories.buyerHistory = []
    } else {
      def sellerHistory = History.findAllBySeller(currentUser)
      def buyerHistory = History.findAllByBuyer(currentUser)
      mapHistories.sellerHistory = sellerHistory
      mapHistories.buyerHistory = buyerHistory
    }
    return mapHistories
  }

  @Override
  Long count() {
    return null
  }

  @Override
  void delete(String id) {

  }

  @Override
  History save(History history) {
    try {
      if (history.save(flush: true, failOnError: true)) {
        def historyElement = new HistoryElement()
        historyElement.properties = history.properties
        historyElement.history = history
        if (historyElement.save(flush: true, failOnError: true)) {
          if (history.comment) {
            Comments comments = new Comments()
            comments.history = history
            comments.historyElement = historyElement
            comments.user = utilityService.currentUser
            comments.comment = history.comment
            comments.service = history.service
            comments.dataset = history.dataset
            comments.save(flush: true, failOnError: true)
          }

        }
      }
    } catch (Exception e) {
      return null
    }
    return history
  }
}
