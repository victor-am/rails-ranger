import { camelizeKeys, decamelizeKeys } from 'humps'

const DataTransformations = {
  prepareRequest (data, headers) {
    if (headers && headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    return JSON.stringify(this.railsFormat(data))
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
