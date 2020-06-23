package com.quexl

import com.quexl.security.User
import com.quexl.utilities.UtilityService
import grails.gorm.transactions.Transactional

@Transactional
class SellerService implements ISellerService {
  UtilityService utilityService

  @Override
  UserService get(String id) {
    return UserService.findById(id)
  }

  @Override
  Map<String, UserService[]> list(Map args) {
    Map<String, UserService[]> mapServices = [:]
    User currentUser = utilityService.currentUser
    if (!currentUser) {
      mapServices.myServices = []
      mapServices.otherServices = []
    } else {
      def sellerHistory = UserService.findAllBySeller(currentUser)
      def buyerHistory = UserService.findAllBySellerNotEqual(currentUser)
      mapServices.myServices = sellerHistory
      mapServices.otherServices = buyerHistory
    }
    return mapServices
  }

  @Override
  Long count() {
    return null
  }

  @Override
  void delete(String id) {

  }

  @Override
  UserService save(UserService service) {
    try {
      service.seller = utilityService.currentUser
      service.save(flush: true, failOnError: true)
    } catch (Exception e) {
      return null
    }
    return service
  }
}
