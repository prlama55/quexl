package com.quexl

import grails.gorm.services.Service

@Service(Resources)
interface ResourcesService {

    Resources get(String id)

    List<Resources> list(Map args)

    Long count()

    void delete(String id)

    Resources save(Resources resources)

}
