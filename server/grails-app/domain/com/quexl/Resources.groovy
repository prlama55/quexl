package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class Resources {

    ObjectId id
    String title
    String description
    double  price =0.0
    Date createdAt = new Date()
    Date updated
    User user

    static constraints = {
        title nullable: false
        description nullable: false
        updated nullable: true
    }
}
