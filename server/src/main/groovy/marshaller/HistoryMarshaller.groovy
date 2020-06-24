package marshaller

import com.quexl.History
import grails.converters.JSON

class HistoryMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(History) { History history ->
      return [
          id          : history?.id?.toString() ?: '',
          purchaseDate: history?.purchaseDate ?: '',
          seller      : history?.seller,
          buyer       : history?.buyer,
          dataset     : history?.dataset,
          service     : history?.service,
          histories   : history?.histories,
          comments    : history?.comments,
          status      : history?.status?.status
      ]
    }
  }
}
