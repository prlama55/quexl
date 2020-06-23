package marshaller

import com.quexl.UserService

import grails.converters.JSON

class UserServiceMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(UserService) { UserService service ->
      return [
          id         : service?.id?.toString() ?: '',
          title      : service?.title ?: '',
          description: service?.description ?: '',
          price      : service?.price ?: 0,
          seller     : service?.seller,
      ]
    }
  }
}
