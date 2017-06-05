import RailsRouteBuilder from '../../src/rails-route-builder'

describe('RailsRouteBuilder', () => {
  let routeBuilder = null

  beforeEach(() => {
    routeBuilder = new RailsRouteBuilder()
  })

  describe('.list', () => {
    it('returns the right path', () => {
      let request = routeBuilder.list('users', { flag: true })
      expect(request.path).to.eq('users?flag=true')
    })
  })

  describe('.show', () => {
    it('returns the right path', () => {
      let request = routeBuilder.show('users', { id: 1, flag: true })
      expect(request.path).to.eq('users/1?flag=true')
    })
  })

  describe('.create', () => {
    it('returns the right path', () => {
      let request = routeBuilder.create('users', { flag: true })
      expect(request.path).to.eq('users')
    })

    it('returns the right parameters', () => {
      let request = routeBuilder.create('users', { flag: true })
      expect(request.params).to.deep.eq({ flag: true })
    })
  })

  describe('.update', () => {
    it('returns the right path', () => {
      let request = routeBuilder.update('users', { id: 1, flag: true })
      expect(request.path).to.eq('users/1')
    })

    it('returns the right parameters', () => {
      let request = routeBuilder.update('users', { id: 1, flag: true })
      expect(request.params).to.deep.eq({ flag: true })
    })
  })

  describe('.destroy', () => {
    it('returns the right path', () => {
      let request = routeBuilder.destroy('users', { id: 1, flag: true })
      expect(request.path).to.eq('users/1?flag=true')
    })
  })

  describe('.new', () => {
    it('returns the right path', () => {
      let request = routeBuilder.new('users', { flag: true })
      expect(request.path).to.eq('users/new?flag=true')
    })
  })

  describe('.edit', () => {
    it('returns the right path', () => {
      let request = routeBuilder.edit('users', { id: 1, flag: true })
      expect(request.path).to.eq('users/1/edit?flag=true')
    })
  })
})
