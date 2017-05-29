import Axios             from 'axios'
import PathBuilder       from './path-builder'
import RailsRouteBuilder from './rails-route-builder'

class RailsRanger {
  /**
  * RailsRanger object constructor
  * @constructor
  * @param {object} configs - Configurations to be handled to Axios.
  */
  constructor (configs = {}) {
    this.client       = Axios.create(configs)
    this.route        = new RailsRouteBuilder()
    this._pathBuilder = new PathBuilder()
  }

  /**
  * Makes a GET request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path (as query or replacing path segments)
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.get('/users/:id', { id: 1, flag: true })
  * //=> GET request to '/users/1?flag=true' path
  */
  get (path, params) {
    let request = this._pathBuilder.get(path, params)
    return this.client.get(request.path)
  }

  /**
  * Makes a POST request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path (as query or replacing path segments)
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.post('/users/:id', { id: 1, flag: true })
  * //=> POST request to '/users/1' path with { flag: true } parameters
  */
  post (path, params) {
    let request = this._pathBuilder.get(path, params)
    return this.client.post(request.path, request.params)
  }

  /**
  * Makes a PATCH request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path (as query or replacing path segments)
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.patch('/users/:id', { id: 1, flag: true })
  * //=> PATCH request to '/users/1' path with { flag: true } parameters
  */
  patch (path, params) {
    let request = this._pathBuilder.get(path, params)
    return this.client.patch(request.path, request.params)
  }

  /**
  * Makes a PUT request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path (as query or replacing path segments)
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.put('/users/:id', { id: 1, flag: true })
  * //=> PUT request to '/users/1' path with { flag: true } parameters
  */
  put (path, params) {
    let request = this._pathBuilder.get(path, params)
    return this.client.put(request.path, request.params)
  }

  /**
  * Makes a DELETE request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path (as query or replacing path segments)
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.delete('/users/:id', { id: 1, flag: true })
  * //=> DELETE request to '/users/1?flag=true' path
  */
  delete (path, params) {
    let request = this._pathBuilder.get(path, params)
    return this.client.delete(request.path, request.params)
  }

  index (resource, params) {
    let request = this.route.index(resource, params)
    return this.client.get(request.path)
  }

  list (resource, params) {
    let request = this.route.index(resource, params)
    return this.client.get(request.path)
  }

  show (resource, params) {
    let request = this.route.show(resource, params)
    return this.client.get(request.path)
  }

  destroy (resource, params) {
    let request = this.route.destroy(resource, params)
    return this.client.delete(request.path)
  }

  create (resource, params) {
    let request = this.route.create(resource, params)
    return this.client.post(request.path, request.params)
  }

  update (resource, params) {
    let request = this.route.update(resource, params)
    return this.client.patch(request.path, request.params)
  }

  new (resource, params) {
    let request = this.route.new(resource, params)
    return this.client.get(request.path)
  }

  edit (resource, params) {
    let request = this.route.edit(resource, params)
    return this.client.get(request.path)
  }
}

export default RailsRanger
