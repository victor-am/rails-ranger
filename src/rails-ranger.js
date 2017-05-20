import Axios from 'axios'

class RailsRanger {
  constructor(configs = {}) {
    // Falls back to Axios configurations
    this.client = Axios.create(configs)
  }

  post(path, params) {
    return this.client.post(path, params)
  }

  //
  // Usage example:
  // > api.get('/blog_posts/:id', { id: 1, flag: true })
  // Will generate:
  // > /blog_posts/1?flag=true
  //
  get(path, params) {
    let processedPath   = path
    let processedParams = params

    for (let key in params) {
      // Skipping inherited proprieties
      if (!params.hasOwnProperty(key)) { continue }

      processedPath = path.replace(':' + key, params[key])

      // If the key was used in the path, it shouldn't be sent as
      // a query parameter
      delete processedParams[key]
    }

    return this.client.get(processedPath, processedParams)
  }
}

export default RailsRanger

