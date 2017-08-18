import qs from 'qs'
import { cloneDeep, merge } from 'lodash'
import deepSnakeCaseKeys from './utils/deep-snake-case-keys'

class PathBuilder {
  get (path, params = {}) {
    const requestInfo = this._injectPathParams(path, params)
    return merge(requestInfo, { method: 'get' })
  }

  post (path, params = {}) {
    const requestInfo = this._injectPathParams(path, params, { skipQuery: true })
    return merge(requestInfo, { method: 'post' })
  }

  patch (path, params = {}) {
    const requestInfo = this._injectPathParams(path, params, { skipQuery: true })
    return merge(requestInfo, { method: 'patch' })
  }

  put (path, params = {}) {
    const requestInfo = this._injectPathParams(path, params, { skipQuery: true })
    return merge(requestInfo, { method: 'put' })
  }

  delete (path, params = {}) {
    const requestInfo = this._injectPathParams(path, params)
    return merge(requestInfo, { method: 'delete' })
  }

  _injectPathParams (path, params, { skipQuery = false } = {}) {
    let requestInfo = { path, params }

    requestInfo = this._paramsToPath(requestInfo)

    if (!skipQuery) {
      requestInfo = this._paramsToQuery(requestInfo)
    }

    return requestInfo
  }

  _paramsToPath ({ path, params }) {
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

  _paramsToQuery ({ path, params }) {
    const snakeCaseParams = deepSnakeCaseKeys(params)
    const query = qs.stringify(snakeCaseParams, { encode: false })
    const pathWithQuery = query ? `${path}?${query}` : path

    return { path: pathWithQuery, params: {} }
  }
}

export default PathBuilder
