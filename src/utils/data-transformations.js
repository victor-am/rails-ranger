import { camelizeKeys, decamelizeKeys } from 'humps'
import Axios                            from 'axios'

const DataTransformations = {
  prepareRequest (data, headers) {
    const defaultTransformRequest = Axios.defaults.transformRequest[0]
    const railsData               = DataTransformations.railsFormat(data)

    return defaultTransformRequest(railsData, headers)
  },

  prepareResponse (data, headers) {
    const defaultTransformResponse = Axios.defaults.transformResponse[0]
    const jsonData                 = defaultTransformResponse(data, headers)

    return DataTransformations.jsFormat(jsonData)
  },

  railsFormat (data) {
    return decamelizeKeys(data)
  },

  jsFormat (data) {
    return camelizeKeys(data)
  }
}

export default DataTransformations
