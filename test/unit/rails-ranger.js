import RailsRanger from '../../src/rails-ranger'

describe('railsRanger', () => {
  describe('.get', () => {
    beforeEach(() => {
      spy(RailsRanger.client, 'get')
    })

    it('triggers a get request through the client', () => {
      let api = new RailsRanger()
      api.get('/users')
      expect(RailsRanger.client.get).to.have.been.calledOnce
    })

    it('interpolates parameters into the path', () => {
      let api = new RailsRanger()
      api.get('/users/:id', { id: 1 })
      expect(RailsRanger.client.get).to.have.been.calledOnce
    })

    it('transforms remaining parameters into query params', () => {
      expect(RailsRanger.greet).to.have.always.returned('hello')
    })
  })
})
