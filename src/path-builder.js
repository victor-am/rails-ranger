import { snakeCase, cloneDeep } from 'lodash'

class PathBuilder {
  get (path, params) {
    return this._injectParamsAndQuery(path, params)
  }

  post (path, params) {
    let request = this._injectParams(path, params)
    return request
  }

  patch (path, params) {
    let request = this._injectParams(path, params)
    return request
  }

  put (path, params) {
    let request = this._injectParams(path, params)
    return request
  }

  delete (path, params) {
    return this._injectParamsAndQuery(path, params)
  }

  _injectParamsAndQuery (path, params) {
    let request = { path, params }
    request = this._injectParams(request.path, request.params)
    request = this._injectQuery(request.path, request.params)
    return request
  }

  //
  // Replaces incidencies of params in the path provided
  // and return the processed path and the params left out
  // of the path
  //
  // injectParams('users/:id', { id: 1 })
  // => { path: 'users/1', params {} }
  //
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
    let keyValuePairs = Object.entries(params)
    let stringParams  = keyValuePairs.map((pair) => `${snakeCase(pair[0])}=${pair[1]}`)
    let query         = stringParams.join('&')

    let querifiedPath = query ? `${path}?${query}` : path
    return { path: querifiedPath, params: {} }
  }
}

export default PathBuilder
