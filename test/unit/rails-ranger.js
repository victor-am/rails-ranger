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
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger._pathBuilder, 'get')
    })

    it('calls the _pathBuilder', () => {
      ranger.get('/users/:id', { id: 1 })
      expect(ranger._pathBuilder.get).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.get('/users/:id', { id: 1, only: 'logged' })
      expect(ranger.client.get).to.have.been.calledWith('/users/1?only=logged')
    })
  })

  describe('.post', () => {
    beforeEach(() => {
      spy(ranger.client, 'post')
      spy(ranger._pathBuilder, 'post')
    })

    it('calls the _pathBuilder', () => {
      ranger.post('/users/:id', { id: 1 })
      expect(ranger._pathBuilder.post).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.post('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.post).to.have.been.calledWith('/users/1', { name: 'John' })
    })
  })

  describe('.put', () => {
    beforeEach(() => {
      spy(ranger.client, 'put')
      spy(ranger._pathBuilder, 'put')
    })

    it('calls the _pathBuilder', () => {
      ranger.put('/users/:id', { id: 1 })
      expect(ranger._pathBuilder.put).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.put('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.put).to.have.been.calledWith('/users/1', { name: 'John' })
    })
  })

  describe('.patch', () => {
    beforeEach(() => {
      spy(ranger.client, 'patch')
      spy(ranger._pathBuilder, 'patch')
    })

    it('calls the _pathBuilder', () => {
      ranger.patch('/users/:id', { id: 1 })
      expect(ranger._pathBuilder.patch).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.patch('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.patch).to.have.been.calledWith('/users/1', { name: 'John' })
    })
  })

  describe('.delete', () => {
    beforeEach(() => {
      spy(ranger.client, 'delete')
      spy(ranger._pathBuilder, 'delete')
    })

    it('calls the _pathBuilder', () => {
      ranger.delete('/users/:id', { id: 1 })
      expect(ranger._pathBuilder.delete).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.delete('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.delete).to.have.been.calledWith('/users/1?name=John')
    })
  })

  describe('.list', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.route, 'list')
    })

    it('calls the route builder', () => {
      ranger.list('users', { flag: true })
      expect(ranger.route.list).to.have.been.calledWith('users', { flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.list('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.get).to.have.been.calledWith('/users/1?name=John')
    })

    it('triggers a get request through the client', () => {
      ranger.list('users')
      expect(ranger.client.get).to.have.been.calledOnce
    })

    it('triggers a get request with the correct path', () => {
      ranger.list('users')
      expect(ranger.client.get).to.have.been.calledWith('users')
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.list('users', { only: 'logged' })
      expect(ranger.client.get).to.have.been.calledWith('users?only=logged')
    })
  })

  describe('.show', () => {
    beforeEach(() => { spy(ranger.client, 'get') })

    it('triggers a get request through the client', () => {
      ranger.show('users', { id: 1 })
      expect(ranger.client.get).to.have.been.calledOnce
    })

    it('triggers a get request with the correct path', () => {
      ranger.show('users', { id: 1 })
      expect(ranger.client.get).to.have.been.calledWith('users/1')
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.show('users', { id: 1, flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/1?flag=true')
    })
  })

  describe('.create', () => {
    beforeEach(() => { spy(ranger.client, 'post') })

    it('triggers a post request through the client', () => {
      ranger.create('users', { name: 'John', email: 'john@doe.com' })
      expect(ranger.client.post).to.have.been.calledOnce
    })

    it('triggers a post request with the correct path', () => {
      ranger.create('users', { name: 'John', email: 'john@doe.com' })
      expect(ranger.client.post).to.have.been.calledWith('users')
    })

    it('sends parameters through the request body', () => {
      ranger.create('users', { name: 'John', email: 'john@doe.com' })
      expect(ranger.client.post).to.have.been.calledWith('users', { name: 'John', email: 'john@doe.com' })
    })
  })

  describe('.update', () => {
    beforeEach(() => { spy(ranger.client, 'patch') })

    it('triggers a patch request through the client', () => {
      ranger.update('users', { id: 1, name: 'Johny' })
      expect(ranger.client.patch).to.have.been.calledOnce
    })

    it('triggers a patch request with the correct path', () => {
      ranger.update('users', { id: 1, name: 'Johny' })
      expect(ranger.client.patch).to.have.been.calledWith('users/1')
    })

    it('sends parameters through the request body', () => {
      ranger.update('users', { id: 1, name: 'Johny' })
      expect(ranger.client.patch).to.have.been.calledWith('users/1', { name: 'Johny' })
    })
  })

  describe('.destroy', () => {
    beforeEach(() => { spy(ranger.client, 'delete') })

    it('triggers a delete request through the client', () => {
      ranger.destroy('users', { id: 1 })
      expect(ranger.client.delete).to.have.been.calledOnce
    })

    it('triggers a delete request with the correct path', () => {
      ranger.destroy('users', { id: 1 })
      expect(ranger.client.delete).to.have.been.calledWith('users/1')
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.destroy('users', { id: 1, flag: true })
      expect(ranger.client.delete).to.have.been.calledWith('users/1?flag=true')
    })
  })

  describe('.new', () => {
    beforeEach(() => { spy(ranger.client, 'get') })

    it('triggers a get request through the client', () => {
      ranger.new('users')
      expect(ranger.client.get).to.have.been.calledOnce
    })

    it('triggers a get request with the correct path', () => {
      ranger.new('users')
      expect(ranger.client.get).to.have.been.calledWith('users/new')
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.new('users', { flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/new?flag=true')
    })
  })

  describe('.edit', () => {
    beforeEach(() => { spy(ranger.client, 'get') })

    it('triggers a get request through the client', () => {
      ranger.edit('users', { id: 1 })
      expect(ranger.client.get).to.have.been.calledOnce
    })

    it('triggers a get request with the correct path', () => {
      ranger.edit('users', { id: 1 })
      expect(ranger.client.get).to.have.been.calledWith('users/1/edit')
    })

    it('transforms remaining parameters from path into query', () => {
      ranger.edit('users', { id: 1, flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/1/edit?flag=true')
    })
  })
})
