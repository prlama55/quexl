package com.quexl

import com.quexl.security.User
import enums.Status
import org.bson.types.ObjectId

class UserServices {

    ObjectId id
    User seller
    User buyer
    Resources service
    Dataset dataset
    Date purchaseDate = new Date()
    Date updatedDate
    Status status=Status.PENDING
    Map<String, String> comment = [:]  // key:userId , value : Comments
    static constraints = {
        comment nullable: true
        updatedDate nullable: true
    }
}
