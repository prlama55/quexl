package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class HistoryElement {

    ObjectId id
    String  name
    Dataset dataset
    UserService userService
    User buyer
    User seller
    Date createdAt = new Date()
    Date updated

    static constraints = {
        name nullable: false
        updated nullable: true
    }
}
