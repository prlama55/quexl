package marshaller

import com.quexl.UserServices
import grails.converters.JSON

class UserHistoryMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(UserServices) { UserServices service ->
      return [
          id          : service?.id?.toString() ?: '',
          purchaseDate: service?.purchaseDate ?: '',
          seller      : service?.seller,
          buyer       : service?.buyer,
          dataset     : service?.dataset,
          service     : service?.service,
          comment     : service?.comment
      ]
    }
  }
}
