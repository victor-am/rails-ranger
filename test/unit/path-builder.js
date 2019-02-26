import PathBuilder from '../../src/path-builder'

describe('PathBuilder', () => {
  let pathBuilder = null

  beforeEach(() => {
    pathBuilder = new PathBuilder()
  })

  describe('.get', () => {
    it('interpolates parameters into the path', () => {
      let request = pathBuilder.get('/users/:id', { id: 1 })
      expect(request.path).to.eq('/users/1')
    })

    it('interpolates more than one parameter into the path', () => {
      let request = pathBuilder.get('/users/:role/:id', { role: 'admin', id: 1 })
      expect(request.path).to.eq('/users/admin/1')
    })

    it('interpolates multiple instances of the same parameter into the path', () => {
      let request = pathBuilder.get('/users/:id/:id', { id: 1 })
      expect(request.path).to.eq('/users/1/1')
    })

    it('interpolates parameters into the query', () => {
      let request = pathBuilder.get('/users/', { id: 1 })
      expect(request.path).to.eq('/users/?id=1')
    })

    it('injects remaining parameters into the query', () => {
      let request = pathBuilder.get('/users/:id', { id: 1, summary: true })
      expect(request.path).to.eq('/users/1?summary=true')
    })

    it('converts camel case params in the query to snake case', () => {
      let request = pathBuilder.get('/users/:id', { id: 1, hideAvatar: true })
      expect(request.path).to.eq('/users/1?hide_avatar=true')
    })

    it('converts nested objects inside the query', () => {
      let request = pathBuilder.get('/users', { filters: { birthday: 15 } })
      expect(request.path).to.eq('/users?filters[birthday]=15')
    })
  })

  describe('.post', () => {
    it('interpolates parameters into the path', () => {
      let request = pathBuilder.post('/users/:id', { id: 1 })
      expect(request.path).to.eq('/users/1')
    })

    it('returns the remaning params', () => {
      let request = pathBuilder.post('/users/:id', { id: 1, flag: true })

      expect(request.path).to.eq('/users/1')
      expect(request.params).to.deep.eq({ flag: true })
    })
  })

  describe('.put', () => {
    it('interpolates parameters into the path', () => {
      let request = pathBuilder.put('/users/:id', { id: 1 })
      expect(request.path).to.eq('/users/1')
    })

    it('returns the remaning params', () => {
      let request = pathBuilder.put('/users/:id', { id: 1, flag: true })

      expect(request.path).to.eq('/users/1')
      expect(request.params).to.deep.eq({ flag: true })
    })
  })

  describe('.patch', () => {
    it('interpolates parameters into the path', () => {
      let request = pathBuilder.patch('/users/:id', { id: 1 })
      expect(request.path).to.eq('/users/1')
    })

    it('returns the remaning params', () => {
      let request = pathBuilder.patch('/users/:id', { id: 1, flag: true })

      expect(request.path).to.eq('/users/1')
      expect(request.params).to.deep.eq({ flag: true })
    })
  })

  describe('.delete', () => {
    it('interpolates parameters into the path', () => {
      let request = pathBuilder.delete('/users/:id', { id: 1 })
      expect(request.path).to.eq('/users/1')
    })

    it('injects remaining parameters into the query', () => {
      let request = pathBuilder.delete('/users/:id', { id: 1, cascade: true })
      expect(request.path).to.eq('/users/1?cascade=true')
    })

    it('converts camel case params in the query to snake case', () => {
      let request = pathBuilder.delete('/users/:id', { id: 1, cascadeDelete: true })
      expect(request.path).to.eq('/users/1?cascade_delete=true')
    })

    it('converts nested objects inside the query', () => {
      let request = pathBuilder.delete('/users/:id', { id: 1, filters: { birthday: 15 } })
      expect(request.path).to.eq('/users/1?filters[birthday]=15')
    })
  })
})
