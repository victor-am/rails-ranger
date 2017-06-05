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
      spy(ranger.pathBuilder, 'get')
    })

    it('calls the pathBuilder', () => {
      ranger.get('/users/:id', { id: 1 })
      expect(ranger.pathBuilder.get).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.get('/users/:id', { id: 1, only: 'logged' })
      expect(ranger.client.get).to.have.been.calledWith('/users/1?only=logged')
    })
  })

  describe('.post', () => {
    beforeEach(() => {
      spy(ranger.client, 'post')
      spy(ranger.pathBuilder, 'post')
    })

    it('calls the pathBuilder', () => {
      ranger.post('/users/:id', { id: 1 })
      expect(ranger.pathBuilder.post).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.post('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.post).to.have.been.calledWith('/users/1', { name: 'John' })
    })
  })

  describe('.put', () => {
    beforeEach(() => {
      spy(ranger.client, 'put')
      spy(ranger.pathBuilder, 'put')
    })

    it('calls the pathBuilder', () => {
      ranger.put('/users/:id', { id: 1 })
      expect(ranger.pathBuilder.put).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.put('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.put).to.have.been.calledWith('/users/1', { name: 'John' })
    })
  })

  describe('.patch', () => {
    beforeEach(() => {
      spy(ranger.client, 'patch')
      spy(ranger.pathBuilder, 'patch')
    })

    it('calls the pathBuilder', () => {
      ranger.patch('/users/:id', { id: 1 })
      expect(ranger.pathBuilder.patch).to.have.been.calledWith('/users/:id', { id: 1 })
    })

    it('calls the client with the right parameters', () => {
      ranger.patch('/users/:id', { id: 1, name: 'John' })
      expect(ranger.client.patch).to.have.been.calledWith('/users/1', { name: 'John' })
    })
  })

  describe('.delete', () => {
    beforeEach(() => {
      spy(ranger.client, 'delete')
      spy(ranger.pathBuilder, 'delete')
    })

    it('calls the pathBuilder', () => {
      ranger.delete('/users/:id', { id: 1 })
      expect(ranger.pathBuilder.delete).to.have.been.calledWith('/users/:id', { id: 1 })
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
      ranger.list('users', { flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users?flag=true')
    })
  })

  describe('.show', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.route, 'show')
    })

    it('calls the route builder', () => {
      ranger.show('users', { id: 1, flag: true })
      expect(ranger.route.show).to.have.been.calledWith('users', { id: 1, flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.show('users', { id: 1, flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/1?flag=true')
    })
  })

  describe('.create', () => {
    beforeEach(() => {
      spy(ranger.client, 'post')
      spy(ranger.route, 'create')
    })

    it('calls the route builder', () => {
      ranger.create('users', { name: 'John' })
      expect(ranger.route.create).to.have.been.calledWith('users', { name: 'John' })
    })

    it('calls the client with the right parameters', () => {
      ranger.create('users', { name: 'John' })
      expect(ranger.client.post).to.have.been.calledWith('users', { name: 'John' })
    })
  })

  describe('.update', () => {
    beforeEach(() => {
      spy(ranger.client, 'patch')
      spy(ranger.route, 'update')
    })

    it('calls the route builder', () => {
      ranger.update('users', { id: 1, name: 'John' })
      expect(ranger.route.update).to.have.been.calledWith('users', { id: 1, name: 'John' })
    })

    it('calls the client with the right parameters', () => {
      ranger.update('users', { id: 1, name: 'John' })
      expect(ranger.client.patch).to.have.been.calledWith('users/1', { name: 'John' })
    })
  })

  describe('.destroy', () => {
    beforeEach(() => {
      spy(ranger.client, 'delete')
      spy(ranger.route, 'destroy')
    })

    it('calls the route builder', () => {
      ranger.destroy('users', { id: 1, flag: true })
      expect(ranger.route.destroy).to.have.been.calledWith('users', { id: 1, flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.destroy('users', { id: 1, flag: true })
      expect(ranger.client.delete).to.have.been.calledWith('users/1?flag=true')
    })
  })

  describe('.new', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.route, 'new')
    })

    it('calls the route builder', () => {
      ranger.new('users', { flag: true })
      expect(ranger.route.new).to.have.been.calledWith('users', { flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.new('users', { flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/new?flag=true')
    })
  })

  describe('.edit', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.route, 'edit')
    })

    it('calls the route builder', () => {
      ranger.edit('users', { id: 1, flag: true })
      expect(ranger.route.edit).to.have.been.calledWith('users', { id: 1, flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.edit('users', { id: 1, flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/1/edit?flag=true')
    })
  })
})
