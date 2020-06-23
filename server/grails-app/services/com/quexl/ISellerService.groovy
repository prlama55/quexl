package com.quexl

interface ISellerService {

  UserService get(String id)

  Map<String, UserService[]> list(Map args)

  Long count()

  void delete(String id)

  UserService save(UserService service)

}
