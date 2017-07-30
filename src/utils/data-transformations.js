import { camelizeKeys, decamelizeKeys } from 'humps'
import Axios                            from 'axios'

const DataTransformations = {
  /**
  * Data transformation function to be used by Axios to process POST, PATCH and PUT requests data
  * @param {object} data - The data being sent through the request
  * @param {object} headers - The headers being sent with the request
  * @returns {string}
  */
  prepareRequest (data, headers) {
    const defaultTransformRequest = Axios.defaults.transformRequest[0]
    const railsData               = DataTransformations.railsFormat(data)

    return defaultTransformRequest(railsData, headers)
  },

  /**
  * Data transformation function to be used by Axios to process response data
  * @param {object} data - The data received through the request response in raw format
  * @param {object} headers - The headers received with the response
  * @returns {object}
  */
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
