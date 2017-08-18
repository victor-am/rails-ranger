import { isObject, transform, snakeCase } from 'lodash'

const deepSnakeCaseKeys = (object) => {
  return transform(object, (result, value, key) => {
    const newValue = isObject(value) ? deepSnakeCaseKeys(value) : value
    result[snakeCase(key)] = newValue
  })
}

export default deepSnakeCaseKeys
