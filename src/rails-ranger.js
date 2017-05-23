import Axios from 'axios'

class RailsRanger {
  constructor (configs = {}) {
    // Falls back to Axios configurations
    this.client = Axios.create(configs)
  }

  //
  // Methods
  //
  get (path, params) {
    // This will translate '/users/:id' to '/users/1'
    let prepared = prepareArguments(path, params)
    // This will inject excess params to the path like '/users/1?flag=true'
    let querifiedPath = injectPathWithQuery(prepared.path, prepared.params)
    return this.client.get(querifiedPath)
  }

  post (path, params) {
    let prepared = prepareArguments(path, params)
    return this.client.post(prepared.path, prepared.params)
  }

  delete (path, params) {
    let prepared = prepareArguments(path, params)
    return this.client.delete(prepared.path, prepared.params)
  }

  //
  // RESTful Actions
  //
  index (...args) {
    this.list(args)
  }

  list (resource, params) {
    let path = resource
    return this.get(path, params)
  }

  show (resource, params) {
    let path = `${resource}/:id`
    return this.get(path, params)
  }

  destroy (resource, params) {
    let path = `${resource}/:id`
    // TODO
    // Make an option for switching to get for destroy actions
    return this.delete(path, params)
  }

  create (resource, params) {
    let path = resource
    return this.post(path, params)
  }

  update (resource, params) {
    let path = `${resource}/:id`
    return this.patch(path, params)
  }

  new (resource, params) {
    let path = `${resource}/:id/new`
    return this.get(path, params)
  }

  edit (resource, params) {
    let path = `${resource}/:id/edit`
    return this.get(path, params)
  }
}

const injectPathWithQuery = function (path, params) {
  let keyValuePairs = Object.entries(params)
  let stringParams = keyValuePairs.map((pair) => `${pair[0]}=${pair[1]}`)
  let query = stringParams.join('&')

  return query ? path + '?' + query : path
}

//
// Replaces incidencies of params in the path provided
// and return the processed path and the params left out
// of the path
//
const prepareArguments = function (path = '', params = {}) {
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

//
// Returns a deep clone from a given object
//
const deepClone = function (object) {
  return JSON.parse(JSON.stringify(object))
}

export default RailsRanger
