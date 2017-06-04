class MockClient {
  get () { return this._mockResponse() }
  put () { return this._mockResponse() }
  post () { return this._mockResponse() }
  patch () { return this._mockResponse() }
  delete () { return this._mockResponse() }

  _mockResponse () { return new Promise(() => true) }
}

export default MockClient
