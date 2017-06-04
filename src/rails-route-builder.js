import PathBuilder from './path-builder'

class RailsRouteBuilder {
  constructor (configs = {}) {
    // TODO
    // Make an option for switching to GET for destroy actions
    this.pathBuilder = new PathBuilder()
  }

  //
  // RESTful Actions
  //
  index (...args) {
    return this.list(...args)
  }

  list (resource, params) {
    let path = resource
    return this.pathBuilder.get(path, params)
  }

  show (resource, params) {
    let path = `${resource}/:id`
    return this.pathBuilder.get(path, params)
  }

  destroy (resource, params) {
    let path = `${resource}/:id`
    return this.pathBuilder.delete(path, params)
  }

  create (resource, params) {
    let path = resource
    return this.pathBuilder.post(path, params)
  }

  update (resource, params) {
    let path = `${resource}/:id`
    return this.pathBuilder.patch(path, params)
  }

  new (resource, params) {
    let path = `${resource}/new`
    return this.pathBuilder.get(path, params)
  }

  edit (resource, params) {
    let path = `${resource}/:id/edit`
    return this.pathBuilder.get(path, params)
  }
}

export default RailsRouteBuilder
