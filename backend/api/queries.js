const connection = require('./knexfile');
const database = require('knex')(connection);

module.exports = {
  getAll() {
    return database('users');
  }
}