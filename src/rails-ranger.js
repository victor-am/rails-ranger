import Axios             from 'axios'
import PathBuilder       from './path-builder'
import RailsRouteBuilder from './rails-route-builder'

class RailsRanger {
  /**
  * RailsRanger object constructor
  * @constructor
  * @param {object} configs - Configurations to be handed to Axios.
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
  * @param {object} params - The parameters to be injected in the path or sent in the request payload
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.post('/users/:id', { id: 1, flag: true })
  * //=> POST request to '/users/1' path with { flag: true } parameters
  */
  post (path, params) {
    let request = this._pathBuilder.post(path, params)
    return this.client.post(request.path, request.params)
  }

  /**
  * Makes a PATCH request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path or sent in the request payload
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.patch('/users/:id', { id: 1, flag: true })
  * //=> PATCH request to '/users/1' path with { flag: true } parameters
  */
  patch (path, params) {
    let request = this._pathBuilder.patch(path, params)
    return this.client.patch(request.path, request.params)
  }

  /**
  * Makes a PUT request to the given path with the given parameters
  * @param {string} path - The base path of the request
  * @param {object} params - The parameters to be injected in the path or sent in the request payload
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.put('/users/:id', { id: 1, flag: true })
  * //=> PUT request to '/users/1' path with { flag: true } parameters
  */
  put (path, params) {
    let request = this._pathBuilder.put(path, params)
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
    let request = this._pathBuilder.delete(path, params)
    return this.client.delete(request.path, request.params)
  }

  /**
  * Makes a GET request to the **index path** of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.index('users', { flag: true })
  * //=> GET request to '/users?flag=true' path
  */
  list (resource, params) {
    let request = this.route.index(resource, params)
    return this.client.get(request.path)
  }

  /**
  * Makes a GET request to the **show path** of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.show('users', { id: 1, flag: true })
  * //=> GET request to '/users/1?flag=true' path
  */
  show (resource, params) {
    let request = this.route.show(resource, params)
    return this.client.get(request.path)
  }

  /**
  * Makes a DELETE request to the **destroy path** of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.destroy('users', { id: 1, flag: true })
  * //=> DELETE request to '/users/1?flag=true' path
  */
  destroy (resource, params) {
    let request = this.route.destroy(resource, params)
    return this.client.delete(request.path)
  }

  /**
  * Makes a POST request to the **create path** of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.create('users', { email: 'john@doe.com', password: 123456 })
  * //=> POST request to '/users' path with the { email: 'john@doe.com', password: 123456 } parameters
  */
  create (resource, params) {
    let request = this.route.create(resource, params)
    return this.client.post(request.path, request.params)
  }

  /**
  * Makes a PATCH request to the update path of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.update('users', { id: 1, email: 'elton@doe.com' })
  * //=> PATCH request to '/users/1' path with the { email: 'elton@doe.com' } parameters
  */
  update (resource, params) {
    let request = this.route.update(resource, params)
    return this.client.patch(request.path, request.params)
  }

  /**
  * Makes a GET request to the new path of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.new('users', { flag: true })
  * //=> GET request to '/users/new?flag=true' path
  */
  new (resource, params) {
    let request = this.route.new(resource, params)
    return this.client.get(request.path)
  }

  /**
  * Makes a GET request to the edit path of the given resource
  * @param {string} resource - The base path of the request
  * @param {object} params - The parameters to be injected in the path as query
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let api = new RailsRanger
  * api.edit('users', { id: 1, flag: true })
  * //=> GET request to '/users/1/edit?flag=true' path
  */
  edit (resource, params) {
    let request = this.route.edit(resource, params)
    return this.client.get(request.path)
  }
}

export default RailsRanger
