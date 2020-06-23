package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class Comments {
  ObjectId id
  User user
  String comment
  History history
  HistoryElement historyElement
  UserService service
  Dataset dataset
  Date commentedAt = new Date()
  static constraints = {
  }
}
