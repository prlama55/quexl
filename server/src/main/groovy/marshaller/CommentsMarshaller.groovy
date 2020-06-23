package marshaller

import com.quexl.Comments
import grails.converters.JSON

class CommentsMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(Comments) { Comments comments ->
      return [
          id         : comments?.id?.toString() ?: '',
          updatedDate: comments?.commentedAt ?: '',
          dataset    : comments?.dataset,
          service    : comments?.service,
          comment   : comments?.comment,
          commentedBy: comments?.user,
          historyId  : comments?.history?.id?.toString()
      ]
    }
  }
}
