import { snakeCase, cloneDeep, merge } from 'lodash'

class PathBuilder {
  get (path, params) {
    const request = this._injectParamsAndQuery(path, params)
    return merge(request, { method: 'get' })
  }

  post (path, params) {
    const request = this._injectParams(path, params)
    return merge(request, { method: 'post' })
  }

  patch (path, params) {
    const request = this._injectParams(path, params)
    return merge(request, { method: 'patch' })
  }

  put (path, params) {
    const request = this._injectParams(path, params)
    return merge(request, { method: 'put' })
  }

  delete (path, params) {
    const request = this._injectParamsAndQuery(path, params)
    return merge(request, { method: 'delete' })
  }

  _injectParamsAndQuery (path, params) {
    let request = { path, params }
    request = this._injectParams(request.path, request.params)
    request = this._injectQuery(request.path, request.params)
    return request
  }

  _injectParams (path = '', params = {}) {
    let processedPath = path
    let processedParams = cloneDeep(params)

    for (let key in params) {
      // Skipping inherited proprieties
      if (!params.hasOwnProperty(key)) { continue }

      // Skipping if the param wasn't found in the path
      if (!processedPath.match(key)) { continue }

      // Replaces the symbol in the path with the param value
      processedPath = path.replace(':' + key, params[key])

      // If the key was used in the path, it shouldn't be sent as
      // a query parameter
      delete processedParams[key]
    }

    return { path: processedPath, params: processedParams }
  }

  _injectQuery (path, params) {
    const keyValuePairs = Object.entries(params)
    const stringParams  = keyValuePairs.map((pair) => `${snakeCase(pair[0])}=${pair[1]}`)
    const query         = stringParams.join('&')

    const querifiedPath = query ? `${path}?${query}` : path
    return { path: querifiedPath, params: {} }
  }
}

export default PathBuilder
