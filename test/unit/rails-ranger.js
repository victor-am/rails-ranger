import RailsRanger from '../../src/rails-ranger'
import MockClient  from '../mock-client'

describe('RailsRanger', () => {
  let ranger = null

  beforeEach(() => {
    // Defines a new RailsRanger instance to be used in each test
    ranger        = new RailsRanger()
    ranger.client = new MockClient()
  })

  describe('.get', () => {
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

  describe('.put', () => {
    beforeEach(() => { spy(ranger.client, 'put') })

    it('triggers a put request through the client', () => {
      ranger.put('/users')
      expect(ranger.client.put).to.have.been.calledOnce
    })

    it('interpolates parameters into the path', () => {
      ranger.put('/users/:id', { id: 1 })
      expect(ranger.client.put).to.have.been.calledWith('/users/1')
    })
  })

  describe('.patch', () => {
    beforeEach(() => { spy(ranger.client, 'patch') })

    it('triggers a patch request through the client', () => {
      ranger.patch('/users')
      expect(ranger.client.patch).to.have.been.calledOnce
    })

    it('interpolates parameters into the path', () => {
      ranger.patch('/users/:id', { id: 1 })
      expect(ranger.client.patch).to.have.been.calledWith('/users/1')
    })
  })

  describe('.delete', () => {
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

  describe('.list', () => {
    beforeEach(() => { spy(ranger.client, 'get') })

    it('triggers a get request through the client', () => {
      ranger.list('users')
      expect(ranger.client.get).to.have.been.calledOnce
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.list('users', { only: 'logged' })
      expect(ranger.client.get).to.have.been.calledWith('users?only=logged')
    })
  })
})
