import PathBuilder from './path-builder'
import { MissingRequiredParameterError } from './exceptions'

const REST_ACTIONS = {
  index:   { path: '/:resource', method: 'get' },
  show:    { path: '/:resource/:id', method: 'get' },
  create:  { path: '/:resource', method: 'post' },
  update:  { path: '/:resource/:id', method: 'patch' },
  destroy: { path: '/:resource/:id', method: 'delete' },
  new:     { path: '/:resource/new', method: 'get' },
  edit:    { path: '/:resource/:id/edit', method: 'get' }
}

class RailsRouteBuilder {
  /**
  * RailsRanger object constructor
  * @constructor
  */
  constructor () {
    this.pathBuilder = new PathBuilder()
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
  do ({ action, on, method }, resource, params = {}) {
    let path
    path = this._pathForAction(action, on)
    path = path.replace(':resource', resource)

    if (!method) {
      method = REST_ACTIONS[action].method
    }

    return this.pathBuilder[method](path, params)
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
    return this.do({ action: 'index' }, resource, params)
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
    return this.do({ action: 'show' }, resource, params)
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
    return this.do({ action: 'destroy' }, resource, params)
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
    return this.do({ action: 'create' }, resource, params)
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
    return this.do({ action: 'update' }, resource, params)
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
    return this.do({ action: 'new' }, resource, params)
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
    return this.do({ action: 'edit' }, resource, params)
  }

  /**
  * Private
  */
  _validateIdPresence (params) {
    if (!params.id) {
      throw new MissingRequiredParameterError('id')
    }
  }

  _pathForAction (action, on) {
    let restAction = REST_ACTIONS[action]

    if (restAction) {
      return restAction.path

    } else if (on === 'member') {
      this._validateIdPresence(params)
      return `:resource/:id/${action}`

    } else if (on === 'collection') {
      return `:resource/${action}`

    }
  }
}

export default RailsRouteBuilder
