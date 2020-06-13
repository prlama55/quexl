package com.quexl

import grails.gorm.services.Service

@Service(History)
interface HistoryService {

    History get(String id)

    List<History> list(Map args)

    Long count()

    void delete(String id)

    History save(History history)

}
