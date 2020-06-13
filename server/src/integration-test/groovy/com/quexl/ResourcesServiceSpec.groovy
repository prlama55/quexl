package com.quexl

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ResourcesServiceSpec extends Specification {

    ResourcesService resourcesService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Resources(...).save(flush: true, failOnError: true)
        //new Resources(...).save(flush: true, failOnError: true)
        //Resources resources = new Resources(...).save(flush: true, failOnError: true)
        //new Resources(...).save(flush: true, failOnError: true)
        //new Resources(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //resources.id
    }

    void "test get"() {
        setupData()

        expect:
        resourcesService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Resources> resourcesList = resourcesService.list(max: 2, offset: 2)

        then:
        resourcesList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        resourcesService.count() == 5
    }

    void "test delete"() {
        Long resourcesId = setupData()

        expect:
        resourcesService.count() == 5

        when:
        resourcesService.delete(resourcesId)
        sessionFactory.currentSession.flush()

        then:
        resourcesService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Resources resources = new Resources()
        resourcesService.save(resources)

        then:
        resources.id != null
    }
}
