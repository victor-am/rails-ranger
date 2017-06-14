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

## How does it work? (pending)

The following should serve as a simple illustration of the library API:

```javascript
import RailsRanger from 'rails-ranger'
let api = new RailsRanger

api.list('users').then((response) => {
  const users = response.body
  alert(users.length + ' users found!')
})
```

The `list` method above will make a request to the **index** path of the **users** resource, following Rails routing conventions. This means a `GET` request to the `/users` path.

> **Observation:** `api.index('users')` would work as well. The `list` method is just an alias.
<br>
<br>

### A sightly more complex example:

```javascript
api.show('users', { id: 1, expanded: false })
```

The example above would translate to a GET request to the following URL `/users/1?expanded=false`.
<br>

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
