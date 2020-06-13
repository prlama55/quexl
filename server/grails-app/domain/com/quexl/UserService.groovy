package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class UserService {

    ObjectId id
    User seller
    User buyer
    Resources service
    Dataset dataset
    Date purchaseDate = new Date()
    Date updatedDate
    Map<String, String> comment = [:]  // key:userId , value : Comments
    static constraints = {
        comment nullable: true
        updatedDate nullable: true
    }
}
