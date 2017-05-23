import RailsRanger from '../../src/rails-ranger';

describe('railsRanger', () => {
  describe('.get', () => {
    beforeEach(() => {
      spy(railsRanger.client, 'get');
    });

    it('triggers a get request through the client', () => {
      api = new RailsRanger
      api.get('/users')
      expect(railsRanger.client.get).to.have.been.calledOnce;
    });

    it('interpolates parameters into the path', () => {
      api = new RailsRanger
      api.get('/users/:id', { id: 1 })
      expect(railsRanger.client.get).to.have.been.calledOnce;
    });

    it('transforms remaining parameters into query params', () => {
      expect(railsRanger.greet).to.have.always.returned('hello');
    });
  });
});
