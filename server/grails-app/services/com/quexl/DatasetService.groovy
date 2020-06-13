package com.quexl

import grails.gorm.services.Service

@Service(Dataset)
interface DatasetService {

    Dataset get(Serializable id)

    List<Dataset> list(Map args)

    Long count()

    void delete(Serializable id)

    Dataset save(Dataset dataset)

}