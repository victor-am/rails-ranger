class MissingRequiredParameterError extends Error {
  constructor(parameter) {
    const message = `[Rails Ranger] The required parameter "${parameter}" was missing from the request.`
    super(message)

    this.name = 'MissingRequiredParameterError'
  }
}
export { MissingRequiredParameterError }
