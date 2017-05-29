class PathBuilder {
  get (path, params) {
    let request = { path, params }
    request = this.injectParams(request.path, request.params)
    request = this.injectQuery(request.path, request.params)

    return request
  }

  post (path, params) {
    let request = this.injectParams(path, params)
    return request
  }

  patch (path, params) {
    let request = this.injectParams(path, params)
    return request
  }

  put (path, params) {
    let request = this.injectParams(path, params)
    return request
  }

  delete (path, params) {
    let request = { path, params }
    request = this.injectParams(request.path, request.params)
    request = this.injectQuery(request.path, request.params)

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
  injectParams (path = '', params = {}) {
    let processedPath = path
    let processedParams = deepClone(params)

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

  injectQuery (path, params) {
    let keyValuePairs = Object.entries(params)
    let stringParams  = keyValuePairs.map((pair) => `${pair[0]}=${pair[1]}`)
    let query         = stringParams.join('&')

    let querifiedPath = query ? `${path}?${query}` : path
    return { path: querifiedPath, params: {} }
  }
}

//
// Returns a deep clone from a given object
//
const deepClone = function (object) {
  return JSON.parse(JSON.stringify(object))
}

export default PathBuilder
