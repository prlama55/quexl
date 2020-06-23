package marshaller

import com.quexl.HistoryElement
import grails.converters.JSON

class HistoriesMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(HistoryElement) { HistoryElement history ->
      return [
          id         : history?.id?.toString() ?: '',
          updatedDate: history?.createdAt ?: '',
          seller     : history?.seller,
          buyer      : history?.buyer,
          dataset    : history?.dataset,
          service    : history?.service,
          comments   : history?.comments,
          historyId  : history?.history?.id?.toString()
      ]
    }
  }
}
