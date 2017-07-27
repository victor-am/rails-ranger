if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/rails-ranger.min.js');
} else {
  module.exports = require('./dist/rails-ranger.js');
}
