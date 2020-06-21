package marshaller

import com.quexl.security.User
import grails.converters.JSON

class UserMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(User) { User user ->
      return [
          id      : user?.id?.toString() ?: '',
          username: user?.username ?: '',
          email   : user?.email ?: '',
      ]
    }
  }
}
