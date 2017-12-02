import { snakeCase, clone }              from 'lodash'
import PathBuilder                       from './path-builder'
import { MissingRequiredParameterError } from './exceptions'

class RailsRouteBuilder {
  /**
  * RailsRanger object constructor
  * @constructor
  */
  constructor () {
    this.pathBuilder  = new PathBuilder()
    this.chainedPaths = []
  }

  /**
  * Defines a namespace to be used in the next route of the chain
  * @param {string} resource - the name of the resource to be used as namespace
  * @param {integer} id - the ID of the resource, can be left empty
  * @example
  * const routes = new RailsRouteBuilder
  * routes.resource('users', 1).list('blogPosts')
  * //=> { path: '/users/1/blog_posts', params: {} }
  */
  resource (resource, id = null) {
    const snakedResource = snakeCase(resource)

    if (id) {
      return this.namespace(`${snakedResource}/:id`, { id })
    } else {
      return this.namespace(snakedResource)
    }
  }

  /**
  * Defines a namespace to be used in the next route of the chain
  * @param {string} namespace - The path fragment to be used as the namespace
  * @param {object} params - The parameters to be interpolated into the path, can be left empty
  * @example
  * const routes = new RailsRouteBuilder
  * routes.namespace('admin').list('blogPosts')
  * //=> { path: '/admin/blog_posts', params: {} }
  */
  namespace (namespace, params = {}) {
    const newInstance = clone(this)

    // Duplicates the chainedPaths as a new object
    newInstance.chainedPaths = clone(this.chainedPaths)

    // Process the given namespace interpolating params on the path
    // Ex:
    // 'users/:id' with params { id: 1 } becomes 'users/1'
    const pathAndParams = this.pathBuilder._paramsToPath({ path: namespace, params })

    // Pushes the new namespace to the chainedPaths
    newInstance.chainedPaths.push(pathAndParams['path'])

    return newInstance
  }

  /**
  * Returns a path and params to the index action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @returns {Promise}
  * @example
  * const routes = new RailsRouteBuilder
  * routes.index('users')
  * //=> { path: '/users', params: {} }
  */
  index (resource, params) {
    const path = snakeCase(resource)
    return this._buildPath('get', path, params)
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
  * const routes = new RailsRouteBuilder
  * routes.show('users', { id: 1 })
  * //=> { path: '/users/1', params: {} }
  */
  show (resource, params) {
    this._validateIdPresence(params)

    const path = `${snakeCase(resource)}/:id`
    return this._buildPath('get', path, params)
  }

  /**
  * Returns a path and params to the destroy action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * const routes = new RailsRouteBuilder
  * routes.destroy('users', { id: 1 })
  * //=> { path: '/users/1', params: {} }
  */
  destroy (resource, params) {
    this._validateIdPresence(params)

    const path = `${snakeCase(resource)}/:id`
    return this._buildPath('delete', path, params)
  }

  /**
  * Returns a path and params to the create action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @returns {Promise}
  * @example
  * const routes = new RailsRouteBuilder
  * routes.create('users', { email: 'john@doe.com' })
  * //=> { path: '/users', params: { email: 'john@doe.com' } }
  */
  create (resource, params) {
    const path = snakeCase(resource)
    return this._buildPath('post', path, params)
  }

  /**
  * Returns a path and params to the update action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * const routes = new RailsRouteBuilder
  * routes.update('users', { id: 1, email: 'john@doe.com' })
  * //=> { path: '/users/1', params: { email: 'john@doe.com' } }
  */
  update (resource, params) {
    this._validateIdPresence(params)

    const path = `${snakeCase(resource)}/:id`
    return this._buildPath('patch', path, params)
  }

  /**
  * Returns a path and params to the new action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @returns {Promise}
  * @example
  * const routes = new RailsRouteBuilder
  * routes.new('users')
  * //=> { path: '/users', params: {} }
  */
  new (resource, params) {
    const path = `${snakeCase(resource)}/new`
    return this._buildPath('get', path, params)
  }

  /**
  * Returns a path and params to the edit action of a given resource
  * @param {string} resource - A resource name
  * @param {object} params - Any parameters for the request
  * @param {number|string} params.id - The id of the resource
  * @returns {Promise}
  * @example
  * const routes = new RailsRouteBuilder
  * routes.edit('users', { id: 1 })
  * //=> { path: '/users/1', params: {} }
  */
  edit (resource, params) {
    this._validateIdPresence(params)

    const path = `${snakeCase(resource)}/:id/edit`
    return this._buildPath('get', path, params)
  }

  /**
   * Private functions
   */
  _validateIdPresence (params) {
    if (!params.id) {
      throw new MissingRequiredParameterError('id')
    }
  }

  _buildPath (method, path, params) {
    const pathWithNestedResources = this._mergeChainPaths(path)

    return this.pathBuilder[method](pathWithNestedResources, params)
  }

  _mergeChainPaths (mainPath) {
    const paths = this.chainedPaths

    if (paths === []) {
      return mainPath
    }

    const chainPaths = paths.reduce((mergedPath, path) => mergedPath + path + '/', '')

    return chainPaths + mainPath
  }
}

export default RailsRouteBuilder
