import Axios             from 'axios'
import PathBuilder       from './path-builder'
import RailsRouteBuilder from './rails-route-builder'

class RailsRanger {
  constructor (configs = {}) {
    // Falls back to Axios configurations
    this.client            = Axios.create(configs)
    this.pathBuilder       = new PathBuilder()
    this.railsRouteBuilder = new RailsRouteBuilder()
  }

  get (path, params) {
    let request = this.pathBuilder.get(path, params)
    return this.client.get(request.path)
  }

  post (path, params) {
    let request = this.pathBuilder.get(path, params)
    return this.client.post(request.path, request.params)
  }

  patch (path, params) {
    let request = this.pathBuilder.get(path, params)
    return this.client.patch(request.path, request.params)
  }

  put (path, params) {
    let request = this.pathBuilder.get(path, params)
    return this.client.put(request.path, request.params)
  }

  delete (path, params) {
    let request = this.pathBuilder.get(path, params)
    return this.client.delete(request.path, request.params)
  }

  //
  // RESTful Actions
  //
  index (resource, params) {
    let request = this.railsRouteBuilder.index(resource, params)
    return this.client.get(request.path)
  }

  list (resource, params) {
    let request = this.railsRouteBuilder.index(resource, params)
    return this.client.get(request.path)
  }

  show (resource, params) {
    let request = this.railsRouteBuilder.show(resource, params)
    return this.client.get(request.path)
  }

  destroy (resource, params) {
    let request = this.railsRouteBuilder.destroy(resource, params)
    return this.client.delete(request.path)
  }

  create (resource, params) {
    let request = this.railsRouteBuilder.create(resource, params)
    return this.client.post(request.path, request.params)
  }

  update (resource, params) {
    let request = this.railsRouteBuilder.update(resource, params)
    return this.client.patch(request.path, request.params)
  }

  new (resource, params) {
    let request = this.railsRouteBuilder.new(resource, params)
    return this.client.get(request.path)
  }

  edit (resource, params) {
    let request = this.railsRouteBuilder.edit(resource, params)
    return this.client.get(request.path)
  }
}

export default RailsRanger
