package com.quexl

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class HistoryElementServiceSpec extends Specification {

    HistoryElementService historyElementService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new HistoryElement(...).save(flush: true, failOnError: true)
        //new HistoryElement(...).save(flush: true, failOnError: true)
        //HistoryElement historyElement = new HistoryElement(...).save(flush: true, failOnError: true)
        //new HistoryElement(...).save(flush: true, failOnError: true)
        //new HistoryElement(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //historyElement.id
    }

    void "test get"() {
        setupData()

        expect:
        historyElementService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<HistoryElement> historyElementList = historyElementService.list(max: 2, offset: 2)

        then:
        historyElementList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        historyElementService.count() == 5
    }

    void "test delete"() {
        Long historyElementId = setupData()

        expect:
        historyElementService.count() == 5

        when:
        historyElementService.delete(historyElementId)
        sessionFactory.currentSession.flush()

        then:
        historyElementService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        HistoryElement historyElement = new HistoryElement()
        historyElementService.save(historyElement)

        then:
        historyElement.id != null
    }
}
