package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class UserService {

    ObjectId id
    User user
    Resources service
    Dataset dataset
    Date purchaseDate = new Date()
    Map<User, String> comment = [:]
    static constraints = {
        comment nullable: true
    }
}
