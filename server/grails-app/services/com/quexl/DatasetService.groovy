package com.quexl

import grails.gorm.services.Service

@Service(Dataset)
interface DatasetService {

    Dataset get(String id)

    List<Dataset> list(Map args)

    Long count()

    void delete(String id)

    Dataset save(Dataset dataset)

}
