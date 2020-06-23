package com.quexl

interface IHistoryService {

  History get(String id)

  Map<String, History[]> list(Map args)

  Long count()

  void delete(String id)

  History save(History history)

}
