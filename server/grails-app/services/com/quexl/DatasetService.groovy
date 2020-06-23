package com.quexl

import com.quexl.utilities.UtilityService
import grails.gorm.transactions.Transactional

@Transactional
class DatasetService implements IDatasetService {
  UtilityService utilityService

  @Override
  Dataset get(String id) {
    return Dataset.findById(id)
  }

  @Override
  List<Dataset> list(Map args) {
    return Dataset.findAllByBuyer(utilityService?.currentUser)
  }

  @Override
  Long count() {
    return null
  }

  @Override
  void delete(String id) {

  }

  @Override
  Dataset save(Dataset dataset) {
    try {
      dataset.buyer = utilityService.currentUser
      dataset.save(flush: true, failOnError: true)
    } catch (Exception e) {
      return null
    }
    return null
  }
}
