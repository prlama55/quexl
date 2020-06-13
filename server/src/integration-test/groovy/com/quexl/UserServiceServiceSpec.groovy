package com.quexl

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class UserServiceServiceSpec extends Specification {

    UserServiceService userServiceService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new UserService(...).save(flush: true, failOnError: true)
        //new UserService(...).save(flush: true, failOnError: true)
        //UserService userService = new UserService(...).save(flush: true, failOnError: true)
        //new UserService(...).save(flush: true, failOnError: true)
        //new UserService(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //userService.id
    }

    void "test get"() {
        setupData()

        expect:
        userServiceService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<UserService> userServiceList = userServiceService.list(max: 2, offset: 2)

        then:
        userServiceList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        userServiceService.count() == 5
    }

    void "test delete"() {
        Long userServiceId = setupData()

        expect:
        userServiceService.count() == 5

        when:
        userServiceService.delete(userServiceId)
        sessionFactory.currentSession.flush()

        then:
        userServiceService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        UserService userService = new UserService()
        userServiceService.save(userService)

        then:
        userService.id != null
    }
}
