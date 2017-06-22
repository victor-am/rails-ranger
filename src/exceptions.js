class MissingRequiredParameterError extends Error {
  constructor(parameter) {
    const message = `The required parameter "${parameter}" was missing.`
    super(message)

    this.name = 'MissingRequiredParameterError'
  }
}
export { MissingRequiredParameterError }
