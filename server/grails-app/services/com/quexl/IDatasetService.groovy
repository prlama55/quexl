package com.quexl

interface IDatasetService {

  Dataset get(String id)

  List<Dataset> list(Map args)

  Long count()

  void delete(String id)

  Dataset save(Dataset dataset)

}
