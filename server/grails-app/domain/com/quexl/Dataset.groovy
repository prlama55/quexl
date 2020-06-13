package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class Dataset {

    ObjectId id
    String dataFormat
    String dataString
    User buyer
    Date createdAt = new Date()
    Date updated


    static constraints = {
        dataFormat nullable: false
        dataString nullable: false
        updated nullable: true

    }
}
