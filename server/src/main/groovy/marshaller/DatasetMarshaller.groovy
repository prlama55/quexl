package marshaller

import com.quexl.Dataset
import grails.converters.JSON

class DatasetMarshaller {
  static void register() {
    JSON.registerObjectMarshaller(Dataset) { Dataset dataset ->
      return [
          id        : dataset?.id?.toString() ?: '',
          dataString: dataset?.dataString ?: '',
          dataFormat: dataset?.dataFormat ?: '',
          buyer     : dataset?.buyer
      ]
    }
  }
}
