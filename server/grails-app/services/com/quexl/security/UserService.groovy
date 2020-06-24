package com.quexl.security

import grails.gorm.transactions.Transactional

@Transactional
class UserService implements IUserService {

  @Override
  User get(String id) {
    return User.findById(id)
  }

  @Override
  List<User> list(Map args) {
    return User.list(args)
  }

  @Override
  Long count() {
    return null
  }

  @Override
  User delete(String id) {
    User user = get(id)
    user.enabled = false
    user.accountLocked = true
    user.save(flush: true)
  }

  @Override
  User save(User user) {
    try {
      user.save(flush: true, failOnError: true)
    } catch (Exception e) {
      return null
    }
    return user
  }
}
