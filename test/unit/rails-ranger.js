import RailsRanger from '../../src/rails-ranger'

describe('RailsRanger', () => {
  let ranger = null

  beforeEach(() => {
    // Defines a new RailsRanger instance to be used in each test
    ranger = new RailsRanger()
  })

  describe('.get', () => {
    // Spy on client.get function
    beforeEach(() => { spy(ranger.client, 'get') })

    it('triggers a get request through the client', () => {
      ranger.get('/users')
      expect(ranger.client.get).to.have.been.calledOnce
    })

    it('interpolates parameters into the path', () => {
      ranger.get('/users/:id', { id: 1 })
      expect(ranger.client.get).to.have.been.calledWith('/users/1')
    })

    it('interpolates parameters into the query', () => {
      ranger.get('/users/', { id: 1 })
      expect(ranger.client.get).to.have.been.calledWith('/users/?id=1')
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.get('/users/:id', { id: 1, only: 'logged' })
      expect(ranger.client.get).to.have.been.calledWith('/users/1?only=logged')
    })
  })

  describe('.post', () => {
    // Spy on client.post function
    beforeEach(() => { spy(ranger.client, 'post') })

    it('triggers a post request through the client', () => {
      ranger.post('/users')
      expect(ranger.client.post).to.have.been.calledOnce
    })

    it('interpolates parameters into the path', () => {
      ranger.post('/users/:id', { id: 1 })
      expect(ranger.client.post).to.have.been.calledWith('/users/1')
    })
  })

  describe('.delete', () => {
    // Spy on client.delete function
    beforeEach(() => { spy(ranger.client, 'delete') })

    it('triggers a delete request through the client', () => {
      ranger.delete('/users')
      expect(ranger.client.delete).to.have.been.calledOnce
    })

    it('interpolates parameters into the path', () => {
      ranger.delete('/users/:id', { id: 1 })
      expect(ranger.client.delete).to.have.been.calledWith('/users/1')
    })
  })
})
