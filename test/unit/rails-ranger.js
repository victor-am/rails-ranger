import RailsRanger from '../../src/rails-ranger'
import MockClient  from '../mock-client'

describe('RailsRanger', () => {
  let ranger = null

  beforeEach(() => {
    // Defines a new RailsRanger instance to be used in each test
    ranger        = new RailsRanger()
    ranger.client = new MockClient()
  })

  describe('constructor', () => {
    it('instantiates RailsRanger with a pathBuilder', () => {
      const railsRanger = new RailsRanger()
      expect(railsRanger.pathBuilder).to.be.an('object')
    })

    it('instantiates RailsRanger with a routeBuilder', () => {
      const railsRanger = new RailsRanger()
      expect(railsRanger.routeBuilder).to.be.an('object')
    })

    describe('transformData', () => {
      it('sets the options.transformData to the correct default when no argument is provided', () => {
        const railsRanger = new RailsRanger({})
        expect(railsRanger.options.transformData).to.eq(true)
      })

      it('sets the options.transformData when provided the correct argument', () => {
        const railsRanger = new RailsRanger({ transformData: false })
        expect(railsRanger.options.transformData).to.eq(false)
      })
    })
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
      spy(ranger.routeBuilder, 'index')
    })

    it('calls the route builder', () => {
      ranger.list('users', { flag: true })
      expect(ranger.routeBuilder.index).to.have.been.calledWith('users', { flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.list('users', { flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users?flag=true')
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).list('users', { flag: true })
      expect(ranger.client.get).to.have.been.calledWith('projects/1/users?flag=true')
    })
  })

  describe('.show', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.routeBuilder, 'show')
    })

    it('calls the route builder', () => {
      ranger.show('users', { id: 1, flag: true })
      expect(ranger.routeBuilder.show).to.have.been.calledWith('users', { id: 1, flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.show('users', { id: 1, flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/1?flag=true')
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).show('users', { id: 2 })
      expect(ranger.client.get).to.have.been.calledWith('projects/1/users/2')
    })
  })

  describe('.create', () => {
    beforeEach(() => {
      spy(ranger.client, 'post')
      spy(ranger.routeBuilder, 'create')
    })

    it('calls the route builder', () => {
      ranger.create('users', { name: 'John' })
      expect(ranger.routeBuilder.create).to.have.been.calledWith('users', { name: 'John' })
    })

    it('calls the client with the right parameters', () => {
      ranger.create('users', { name: 'John' })
      expect(ranger.client.post).to.have.been.calledWith('users', { name: 'John' })
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).create('users', { name: 'John' })
      expect(ranger.client.post).to.have.been.calledWith('projects/1/users', { name: 'John' })
    })
  })

  describe('.update', () => {
    beforeEach(() => {
      spy(ranger.client, 'patch')
      spy(ranger.routeBuilder, 'update')
    })

    it('calls the route builder', () => {
      ranger.update('users', { id: 1, name: 'John' })
      expect(ranger.routeBuilder.update).to.have.been.calledWith('users', { id: 1, name: 'John' })
    })

    it('calls the client with the right parameters', () => {
      ranger.update('users', { id: 1, name: 'John' })
      expect(ranger.client.patch).to.have.been.calledWith('users/1', { name: 'John' })
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).update('users', { id: 2, name: 'John' })
      expect(ranger.client.patch).to.have.been.calledWith('projects/1/users/2', { name: 'John' })
    })
  })

  describe('.destroy', () => {
    beforeEach(() => {
      spy(ranger.client, 'delete')
      spy(ranger.routeBuilder, 'destroy')
    })

    it('calls the route builder', () => {
      ranger.destroy('users', { id: 1, flag: true })
      expect(ranger.routeBuilder.destroy).to.have.been.calledWith('users', { id: 1, flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.destroy('users', { id: 1, flag: true })
      expect(ranger.client.delete).to.have.been.calledWith('users/1?flag=true')
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).destroy('users', { id: 2 })
      expect(ranger.client.delete).to.have.been.calledWith('projects/1/users/2')
    })

    it('works with a namespace', () => {
      ranger.namespace('blog_posts').destroy('users', { id: 2 })
      expect(ranger.client.delete).to.have.been.calledWith('blog_posts/users/2')
    })
  })

  describe('.new', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.routeBuilder, 'new')
    })

    it('calls the route builder', () => {
      ranger.new('users', { flag: true })
      expect(ranger.routeBuilder.new).to.have.been.calledWith('users', { flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.new('users', { flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/new?flag=true')
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).new('users')
      expect(ranger.client.get).to.have.been.calledWith('projects/1/users/new')
    })

    it('works with a namespace', () => {
      ranger.namespace('blog_posts/:id', { id: 1 }).new('users')
      expect(ranger.client.get).to.have.been.calledWith('blog_posts/1/users/new')
    })
  })

  describe('.edit', () => {
    beforeEach(() => {
      spy(ranger.client, 'get')
      spy(ranger.routeBuilder, 'edit')
    })

    it('calls the route builder', () => {
      ranger.edit('users', { id: 1, flag: true })
      expect(ranger.routeBuilder.edit).to.have.been.calledWith('users', { id: 1, flag: true })
    })

    it('calls the client with the right parameters', () => {
      ranger.edit('users', { id: 1, flag: true })
      expect(ranger.client.get).to.have.been.calledWith('users/1/edit?flag=true')
    })

    it('works with a resource namespace', () => {
      ranger.resource('projects', 1).edit('users', { id: 2 })
      expect(ranger.client.get).to.have.been.calledWith('projects/1/users/2/edit')
    })

    it('works with a namespace', () => {
      ranger.namespace('blog_posts/:id', { id: 1 }).edit('users', { id: 2 })
      expect(ranger.client.get).to.have.been.calledWith('blog_posts/1/users/2/edit')
    })
  })

  describe('.resource', () => {
    it('does not taint the original instance', () => {
      ranger.resource('users')
      expect(ranger.routeBuilder.chainedPaths).to.be.empty
    })

    context('resource without id', () => {
      it('returns a new RailsRanger instance when resource is chained once', () => {
        let returnedValue = ranger.resource('users')
        expect(returnedValue).to.be.an.instanceOf(RailsRanger)
      })

      it('returns a new RailsRanger instance when resource is chained twice', () => {
        let returnedValue = ranger.resource('users').resource('blogPost')
        expect(returnedValue).to.be.an.instanceOf(RailsRanger)
      })
    })

    context('resource with id', () => {
      it('returns a new RailsRanger instance when resource is chained once', () => {
        let returnedValue = ranger.resource('users', 1)
        expect(returnedValue).to.be.an.instanceOf(RailsRanger)
      })

      it('returns a new RailsRanger instance when resource is chained twice', () => {
        let returnedValue = ranger.resource('users', 1).resource('blogPost', 2)
        expect(returnedValue).to.be.an.instanceOf(RailsRanger)
      })
    })
  })
})
