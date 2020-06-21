package marshaller

import com.quexl.Resources
import com.quexl.UserServices
import grails.converters.JSON

class UserServiceMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(Resources) { Resources service ->
      return [
          id          : service?.id?.toString() ?: '',
          title          : service?.title ?: '',
          description          : service?.description ?: '',
          price          : service?.price ?: 0,
          seller      : service?.seller,
      ]
    }
  }
}
