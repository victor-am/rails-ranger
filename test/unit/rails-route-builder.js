import RailsRouteBuilder from '../../src/rails-route-builder'
import { MissingRequiredParameterError } from '../../src/exceptions'

describe('RailsRouteBuilder', () => {
  let routeBuilder = null

  beforeEach(() => {
    routeBuilder = new RailsRouteBuilder()
  })

  describe('.do', () => {
    it('returns the right path', () => {
    })

    it('returns the right method when left to the default', () => {
    })

    it('returns the right method when given an specific method', () => {
    })
  })

  describe('.list', () => {
    it('returns the right path', () => {
      let request = routeBuilder.list('users', { flag: true })
      expect(request.path).to.eq('/users?flag=true')
    })

    it('returns the right method', () => {
      let request = routeBuilder.list('users', { flag: true })
      expect(request.method).to.eq('get')
    })
  })

  describe('.index', () => {
    it('returns the right path', () => {
      let request = routeBuilder.index('users', { flag: true })
      expect(request.path).to.eq('/users?flag=true')
    })

    it('returns the right method', () => {
      let request = routeBuilder.index('users', { flag: true })
      expect(request.method).to.eq('get')
    })
  })

  describe('.show', () => {
    it('returns the right path', () => {
      let request = routeBuilder.show('users', { id: 1, flag: true })
      expect(request.path).to.eq('/users/1?flag=true')
    })

    it('returns the right method', () => {
      let request = routeBuilder.show('users', { id: 1, flag: true })
      expect(request.method).to.eq('get')
    })

    it ('throws an exception when no id is provided', () => {
      let route = () => { routeBuilder.show('users', { flag: true }) }
      expect(route).to.throw(Error)
    })
  })

  describe('.create', () => {
    it('returns the right path', () => {
      let request = routeBuilder.create('users', { flag: true })
      expect(request.path).to.eq('/users')
    })

    it('returns the right parameters', () => {
      let request = routeBuilder.create('users', { flag: true })
      expect(request.params).to.deep.eq({ flag: true })
    })

    it('returns the right method', () => {
      let request = routeBuilder.create('users', { flag: true })
      expect(request.method).to.eq('post')
    })
  })

  describe('.update', () => {
    it('returns the right path', () => {
      let request = routeBuilder.update('users', { id: 1, flag: true })
      expect(request.path).to.eq('/users/1')
    })

    it('returns the right parameters', () => {
      let request = routeBuilder.update('users', { id: 1, flag: true })
      expect(request.params).to.deep.eq({ flag: true })
    })

    it('returns the right method', () => {
      let request = routeBuilder.update('users', { id: 1, flag: true })
      expect(request.method).to.eq('patch')
    })

    it ('throws an exception when no id is provided', () => {
      let route = () => { routeBuilder.update('users', { flag: true }) }
      expect(route).to.throw(Error)
    })
  })

  describe('.destroy', () => {
    it('returns the right path', () => {
      let request = routeBuilder.destroy('users', { id: 1, flag: true })
      expect(request.path).to.eq('/users/1?flag=true')
    })

    it('returns the right method', () => {
      let request = routeBuilder.destroy('users', { id: 1, flag: true })
      expect(request.method).to.eq('delete')
    })

    it ('throws an exception when no id is provided', () => {
      let route = () => { routeBuilder.destroy('users', { flag: true }) }
      expect(route).to.throw(Error)
    })
  })

  describe('.new', () => {
    it('returns the right path', () => {
      let request = routeBuilder.new('users', { flag: true })
      expect(request.path).to.eq('/users/new?flag=true')
    })

    it('returns the right method', () => {
      let request = routeBuilder.new('users', { flag: true })
      expect(request.method).to.eq('get')
    })
  })

  describe('.edit', () => {
    it('returns the right path', () => {
      let request = routeBuilder.edit('users', { id: 1, flag: true })
      expect(request.path).to.eq('/users/1/edit?flag=true')
    })

    it('returns the right method', () => {
      let request = routeBuilder.edit('users', { id: 1, flag: true })
      expect(request.method).to.eq('get')
    })

    it ('throws an exception when no id is provided', () => {
      let route = () => { routeBuilder.edit('users', { flag: true }) }
      expect(route).to.throw(Error)
    })
  })
})
