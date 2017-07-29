import { camelizeKeys, decamelizeKeys } from 'humps'
import Axios                            from 'axios'

const DataTransformations = {
  prepareRequest (data, headers) {
    const defaultTransformRequest = Axios.defaults.transformRequest[0]
    const railsData               = this.railsFormat(data)

    return defaultTransformRequest(railsData, headers)
  },

  prepareResponse (data, _headers) {
    return this.jsFormat(data)
  },

  railsFormat (data) {
    return decamelizeKeys(data)
  },

  jsFormat (data) {
    return camelizeKeys(data)
  }
}

export default DataTransformations
