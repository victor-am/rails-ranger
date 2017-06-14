# Rails Ranger
### Exploring the routes and paths of Rails APIs
> This library development is in a very early stage and the API is **VERY** unstable

#### [Github Repository](https://github.com/victor-am/rails-ranger) | [Documentation](https://victor-am.github.io/rails-ranger)

[![npm version](https://badge.fury.io/js/rails-ranger.svg)](https://badge.fury.io/js/rails-ranger)
[![Travis build status](http://img.shields.io/travis/victor-am/rails-ranger.svg?style=flat)](https://travis-ci.org/victor-am/rails-ranger)
[![Test Coverage](https://codeclimate.com/github/victor-am/rails-ranger/badges/coverage.svg)](https://codeclimate.com/github/victor-am/rails-ranger)
[![Dependency Status](https://david-dm.org/victor-am/rails-ranger.svg)](https://david-dm.org/victor-am/rails-ranger)
[![devDependency Status](https://david-dm.org/victor-am/rails-ranger/dev-status.svg)](https://david-dm.org/victor-am/rails-ranger#info=devDependencies)

Rails Ranger is a thin layer on top of [Axios](https://github.com/mzabriskie/axios), which gives you an opinionated interface to query APIs built with Ruby on Rails.

## Installation
```javascript
npm install rails-ranger
```
<br>

## How does it work?

The following should serve as a simple illustration of the library API:

```javascript
import RailsRanger from 'rails-ranger'
let api = new RailsRanger

api.list('users').then((response) => {
  const users = response.data
  alert(users.length + ' users found!')
})
// => GET request to /users
```

The `list` method above will make a request to the **index** path of the **users** resource, following Rails routing conventions. This means a `GET` request to the `/users` path.

> **Observation:** you can use `api.index('users')` as well. The `list` function is just an alias for it.
<br>

### A sightly more complex example:

```javascript
api.show('users', { id: 1, expanded: false })
// => GET request to /users/1?expanded=false
```
<br>

## Passing options to Axios
As the first argument when creating a new instance of Rails Ranger, you can pass an object of options that will be handled to Axios. Some examples:

### Base URL
```javascript
const api = new RailsRanger({ baseUrl: 'http://myapp.com/api' })

api.list('users')
// => GET request to http://myapp.com/api/users
```

### Timeout
```javascript
const api = new RailsRanger({ timeout: 3000 })

api.list('users') // => Will timeout within 3000 miliseconds
```

### See more in the [Axios documentation](https://github.com/mzabriskie/axios#request-config)
<br>

## Using Rails Ranger just for building routes
You don't need to use Rails Ranger as an ajax client if you don't want to. It can also be used just to generate the routes from your resources. To use Rails Ranger this way you can do the following:

```javascript
import { RouteBuilder } from RailsRanger

RouteBuilder.create('users', { name: 'John' })
// => { path: '/users', params: { name: 'John' }, method: 'post' }
 
RouteBuilder.show('users', { id: 1, hidePassword: true })
// => { path: '/users/1?hide_password=true', params: {}, method: 'get' }

RouteBuilder.get('/:api/documentation', { api: 'v1', page: 3 })
// => { path: 'v1/documentation?page=3', params: {}, method: 'get' }
```

## Actions (pending)

- list/index
- show
- new
- create
- edit
- update
<br>

## Methods (pending)

- GET
- POST
- PATCH
- PUT
- DELETE
<br>
