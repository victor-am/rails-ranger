# Rails Ranger
### Exploring the routes and paths of Rails APIs
> This library development is in very early stage, but feel free to opinate and help

Rails Ranger is a very thin layer on top of [Axios](/mzabriskie/axios), which gives you an opinionated interface to query APIs built with Ruby on Rails.

## Installation
yarn add 'rails-ranger'

## Usage
```javascript
import RailsRanger from 'rails-ranger'
let api = new RailsRanger

//
// All requests return promises
//

api.list('users')
//=> GET /users

api.show('user', { id: 1 })
//=> GET /users/1

api.create('user', { name: 'John Doe', email: 'john@doe.com' })
//=> POST /users

api.get('/users/:id', { id: 1, format: 'basic' })
//=> GET /users/1?format=basic
```

## Features
**TODO**
