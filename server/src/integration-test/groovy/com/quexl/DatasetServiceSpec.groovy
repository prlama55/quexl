package com.quexl

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class DatasetServiceSpec extends Specification {

    DatasetService datasetService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Dataset(...).save(flush: true, failOnError: true)
        //new Dataset(...).save(flush: true, failOnError: true)
        //Dataset dataset = new Dataset(...).save(flush: true, failOnError: true)
        //new Dataset(...).save(flush: true, failOnError: true)
        //new Dataset(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //dataset.id
    }

    void "test get"() {
        setupData()

        expect:
        datasetService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Dataset> datasetList = datasetService.list(max: 2, offset: 2)

        then:
        datasetList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        datasetService.count() == 5
    }

    void "test delete"() {
        Long datasetId = setupData()

        expect:
        datasetService.count() == 5

        when:
        datasetService.delete(datasetId)
        sessionFactory.currentSession.flush()

        then:
        datasetService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Dataset dataset = new Dataset()
        datasetService.save(dataset)

        then:
        dataset.id != null
    }
}
