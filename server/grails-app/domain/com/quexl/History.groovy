package com.quexl

import com.quexl.security.User
import org.bson.types.ObjectId

class History {

    ObjectId id
    User owner
    List <HistoryElement> historyElement =[]
    Date createdAt = new Date()
    Date updated

    static constraints = {
        updated nullable: true

    }
}
