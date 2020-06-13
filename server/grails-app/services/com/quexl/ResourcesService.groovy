package com.quexl

import grails.gorm.services.Service

@Service(Resources)
interface ResourcesService {

    Resources get(Serializable id)

    List<Resources> list(Map args)

    Long count()

    void delete(Serializable id)

    Resources save(Resources resources)

}