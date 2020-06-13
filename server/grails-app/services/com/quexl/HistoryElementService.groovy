package com.quexl

import grails.gorm.services.Service

@Service(HistoryElement)
interface HistoryElementService {

    HistoryElement get(Serializable id)

    List<HistoryElement> list(Map args)

    Long count()

    void delete(Serializable id)

    HistoryElement save(HistoryElement historyElement)

}