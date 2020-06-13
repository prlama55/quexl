package com.quexl

import grails.gorm.services.Service

@Service(HistoryElement)
interface HistoryElementService {

    HistoryElement get(String id)

    List<HistoryElement> list(Map args)

    Long count()

    void delete(String id)

    HistoryElement save(HistoryElement historyElement)

}
