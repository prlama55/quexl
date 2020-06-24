package com.quexl

import com.quexl.security.User
import enums.Status
import org.bson.types.ObjectId

class History {

  ObjectId id
  User seller
  User buyer
  UserService service
  Dataset dataset
  Date purchaseDate = new Date()
  Date updatedDate = new Date()
  User updatedBy
  Status status
  String comment // last comment
  String outputDataset
  static constraints = {
    updatedDate nullable: true
    updatedBy nullable: true
    comment nullable: true
    outputDataset nullable: true
  }

  def beforeValidate() {
    updatedDate = new Date()
    if(!status){
      status = Status.PENDING
    }
  }

  List<HistoryElement> getHistories() {
    return HistoryElement.findAllByHistory(this)
  }

  List<Comments> getComments() {
    return Comments.findAllByHistory(this)
  }
}
