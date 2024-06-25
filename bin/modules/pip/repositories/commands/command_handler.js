
const Pip = require('./domain');
const config = require('../../../../infra/configs/global_config');

// Mongo
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));

const pip = new Pip(db);


module.exports = {
};
