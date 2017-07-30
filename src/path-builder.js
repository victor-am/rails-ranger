import { snakeCase, cloneDeep, merge } from 'lodash'

class PathBuilder {
  get (path, params = {}) {
    const requestInfo = this._interpolateInPath(path, params)
    return merge(requestInfo, { method: 'get' })
  }

  post (path, params = {}) {
    const requestInfo = this._interpolateInPath(path, params, { skipQuery: true })
    return merge(requestInfo, { method: 'post' })
  }

  patch (path, params = {}) {
    const requestInfo = this._interpolateInPath(path, params, { skipQuery: true })
    return merge(requestInfo, { method: 'patch' })
  }

  put (path, params = {}) {
    const requestInfo = this._interpolateInPath(path, params, { skipQuery: true })
    return merge(requestInfo, { method: 'put' })
  }

  delete (path, params = {}) {
    const requestInfo = this._interpolateInPath(path, params)
    return merge(requestInfo, { method: 'delete' })
  }

  _interpolateInPath (path, params, { skipQuery = false } = {}) {
    let requestInfo = { path, params }

    requestInfo = this._interpolateParamsInPath(requestInfo)

    if (!skipQuery) {
      requestInfo = this._injectQueryInPath(requestInfo)
    }

    return requestInfo
  }

  _interpolateParamsInPath ({ path, params }) {
    let processedPath   = path
    let processedParams = cloneDeep(params)

    for (let key in params) {
      // Skipping inherited proprieties
      if (!params.hasOwnProperty(key)) { continue }

      const symbol = ':' + key
      // Skipping if the param wasn't found in the path
      if (!path.includes(symbol)) { continue }

      // Replaces the symbol in the path with the param value
      processedPath = path.replace(symbol, params[key])

      // If the key was used in the path, it shouldn't be sent asa query parameter
      delete processedParams[key]
    }

    return { path: processedPath, params: processedParams }
  }

  _injectQueryInPath ({ path, params }) {
    const keyValuePairs = Object.entries(params)
    const stringParams  = keyValuePairs.map((pair) => `${snakeCase(pair[0])}=${pair[1]}`)
    const query         = stringParams.join('&')

    const querifiedPath = query ? `${path}?${query}` : path
    return { path: querifiedPath, params: {} }
  }
}

export default PathBuilder
