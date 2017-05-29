# Rails Ranger
### Exploring the routes and paths of Rails APIs
> This library development is in a very early stage


[![Travis build status](http://img.shields.io/travis/victor-am/rails-ranger.svg?style=flat)](https://travis-ci.org/victor-am/rails-ranger)
[![Code Climate](https://codeclimate.com/github/victor-am/rails-ranger/badges/gpa.svg)](https://codeclimate.com/github/victor-am/rails-ranger)
[![Test Coverage](https://codeclimate.com/github/victor-am/rails-ranger/badges/coverage.svg)](https://codeclimate.com/github/victor-am/rails-ranger)
[![Dependency Status](https://david-dm.org/victor-am/rails-ranger.svg)](https://david-dm.org/victor-am/rails-ranger)
[![devDependency Status](https://david-dm.org/victor-am/rails-ranger/dev-status.svg)](https://david-dm.org/victor-am/rails-ranger#info=devDependencies)
[![Ebert](https://ebertapp.io/github/victor-am/rails-ranger.svg)](https://ebertapp.io/github/victor-am/rails-ranger)

Rails Ranger is a thin layer on top of [Axios](/mzabriskie/axios), which gives you an opinionated interface to query APIs built with Ruby on Rails.
<br>
[See the documentation](https://victor-am.github.io/rails-ranger)

## Installation
**TODO**

## Usage

```javascript
import RailsRanger from 'rails-ranger'
let api = new RailsRanger

api.list('users')
//=> GET /users

api.show('users', { id: 1 })
//=> GET /users/1

api.create('users', { name: 'John Doe', email: 'john@doe.com' })
//=> POST /users

api.get('/users/:id', { id: 1, format: 'basic' })
//=> GET /users/1?format=basic
```

## Features
**TODO**
