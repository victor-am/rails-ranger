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

    it('interpolates parameters into the query', () => {
      let request = pathBuilder.get('/users/', { id: 1 })
      expect(request.path).to.eq('/users/?id=1')
    })

    it('inject remaining parameters into the query', () => {
      let request = pathBuilder.get('/users/:id', { id: 1, only: 'logged' })
      expect(request.path).to.eq('/users/1?only=logged')
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

    it('inject remaining parameters into the query', () => {
      let request = pathBuilder.delete('/users/:id', { id: 1, only: 'logged' })
      expect(request.path).to.eq('/users/1?only=logged')
    })
  })
})
