import DataTransformations from '../../../src/utils/data-transformations'

describe('DataTransformations', () => {
  describe('.prepareRequest', () => {
    it('sets the content-type to JSON if there is none set', () => {
      const data    = { name: 'John' }
      const headers = {}

      DataTransformations.prepareRequest(data, headers)

      expect(headers).to.deep.eq({ 'Content-Type': 'application/json;charset=utf-8' })
    })

    it('preserves the content-type if there is one already', () => {
      const data    = { name: 'John' }
      const headers = { 'Content-Type': 'foo' }

      DataTransformations.prepareRequest(data, headers)

      expect(headers).to.deep.eq({ 'Content-Type': 'foo' })
    })

    it('formats the data in Ruby on Rails format', () => {
      const data    = { name: 'John' }
      const headers = {}

      spy(DataTransformations, 'railsFormat')

      DataTransformations.prepareRequest(data, headers)

      expect(DataTransformations.railsFormat).to.have.been.calledWith(data)
    })

    it('returns the data as string', () => {
      const data    = { name: 'John' }
      const headers = {}

      const result = DataTransformations.prepareRequest(data, headers)

      expect(result).to.eq('{"name":"John"}')
    })
  })

  describe('.prepareResponse', () => {
    it('formats the data in Javascript format', () => {
      const data    = { name: 'John' }
      const headers = {}

      spy(DataTransformations, 'jsFormat')

      DataTransformations.prepareResponse(data, headers)

      expect(DataTransformations.jsFormat).to.have.been.calledWith(data)
    })
  })

  describe('.railsFormat', () => {
    it('returns the given data with snake_cased keys', () => {
      const data = {
        name:        'John',
        last_name:   'Doe',
        homeAddress: 'none'
      }

      const result = DataTransformations.railsFormat(data)

      expect(result).to.deep.eq({ name: 'John', last_name: 'Doe', home_address: 'none' })
    })
  })

  describe('.jsFormat', () => {
    it('returns the given data with camelCased keys', () => {
      const data = {
        name:        'John',
        last_name:   'Doe',
        homeAddress: 'none'
      }

      const result = DataTransformations.jsFormat(data)

      expect(result).to.deep.eq({ name: 'John', lastName: 'Doe', homeAddress: 'none' })
    })
  })
})
