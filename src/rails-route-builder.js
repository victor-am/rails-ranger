import PathBuilder from './path-builder'
import { MissingRequiredParameterError } from './exceptions'

class RailsRouteBuilder {
  /**
  * RailsRanger object constructor
  * @constructor
  */
  constructor () {
    // TODO
    // Make an option for switching to GET for destroy actions
    this.pathBuilder = new PathBuilder()
  }

  /**
  * Returns a path and params to the index action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.index('users')
  * //=> { path: '/users', params: {} }
  */
  index (resource, params) {
    let path = resource
    return this.pathBuilder.get(path, params)
  }

  /**
  * An alias for the {@link RailsRouteBuilder#index} function
  */
  list (...args) {
    return this.index(...args)
  }

  /**
  * Returns a path and params to the show action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.show('users', { id: 1 })
  * //=> { path: '/users/1', params: {} }
  */
  show (resource, params) {
    this._validateIdPresence(params)
    let path = `${resource}/:id`
    return this.pathBuilder.get(path, params)
  }

  /**
  * Returns a path and params to the destroy action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.destroy('users', { id: 1 })
  * //=> { path: '/users/1', params: {} }
  */
  destroy (resource, params) {
    this._validateIdPresence(params)
    let path = `${resource}/:id`
    return this.pathBuilder.delete(path, params)
  }

  /**
  * Returns a path and params to the create action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.create('users', { email: 'john@doe.com' })
  * //=> { path: '/users', params: { email: 'john@doe.com' } }
  */
  create (resource, params) {
    let path = resource
    return this.pathBuilder.post(path, params)
  }

  /**
  * Returns a path and params to the update action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.update('users', { id: 1, email: 'john@doe.com' })
  * //=> { path: '/users/1', params: { email: 'john@doe.com' } }
  */
  update (resource, params) {
    this._validateIdPresence(params)
    let path = `${resource}/:id`
    return this.pathBuilder.patch(path, params)
  }

  /**
  * Returns a path and params to the new action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.new('users')
  * //=> { path: '/users', params: {} }
  */
  new (resource, params) {
    let path = `${resource}/new`
    return this.pathBuilder.get(path, params)
  }

  /**
  * Returns a path and params to the edit action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * let routes = new RailsRouteBuilder
  * routes.edit('users', { id: 1 })
  * //=> { path: '/users/1', params: {} }
  */
  edit (resource, params) {
    this._validateIdPresence(params)
    let path = `${resource}/:id/edit`
    return this.pathBuilder.get(path, params)
  }

  _validateIdPresence (params) {
    if (!params.id) {
      throw new MissingRequiredParameterError('id')
    }
  }
}

export default RailsRouteBuilder
