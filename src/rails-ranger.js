import Axios from 'axios'

class RailsRanger {
  constructor() {
    // Add config for hostname
    // Add config for headers
    // Add config for timeout
    // Add config for namespaces
    this.client = Axios.create({})
  }

  post(path, params) {
    return this.client.post(path, params)
  }

  get(path, pathParams, queryParams) {
    let processedPath = path

    pathParams.forEachWithIndex((paramName, paramValue) => {
      processedPath = path.gsub(':' + paramName, paramValue)
    })

    return this.client.get(processedPath, queryParams)
  }
}
