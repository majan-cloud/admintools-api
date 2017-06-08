var mysql = require('promise-mysql')
  , config = require('config')
  , log = require('metalogger')();

var datastore = {};
console.log('Config ...', config.db);

/**
 * get database connection
 * 
 * @retrun a Promise representing a connection
 * @memberOf DataStore
 */
datastore.conn = function() {
  return mysql.createPool(
    config.db
  );
};

module.exports = datastore;