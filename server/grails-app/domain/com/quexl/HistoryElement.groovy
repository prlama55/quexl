package com.quexl

import org.bson.types.ObjectId

class HistoryElement {

    ObjectId id
    String  name
    Dataset dataset
    Date createdAt = new Date()
    Date updated
    static constraints = {
        name nullable: false
        updated nullable: true
    }
}
