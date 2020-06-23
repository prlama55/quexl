package com.quexl

import com.quexl.security.User
import enums.Status
import org.bson.types.ObjectId

class HistoryElement {

  ObjectId id
  History history
  User seller
  User buyer
  UserService service
  Dataset dataset
  Date purchaseDate = new Date()
  Date updatedDate
  User updatedBy
  Date createdAt = new Date()
  Status status = Status.PENDING
  String comment // last comment
  static constraints = {
    updatedDate nullable: true
    updatedBy nullable: true
    comment nullable: true
  }

  def beforeValidate() {
    updatedDate = new Date()
  }

  List<Comments> getComments() {
    return Comments.findAllByHistoryElement(this)
  }
}
