
const VenuesPresisi = require('./domain');
const config = require('../../../../infra/configs/global_config');

// Mongo
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));

const venuesPresisi = new VenuesPresisi(db);

const updateVenuePresisi = async (payload) => {
  return venuesPresisi.updateVenuePresisi(payload);
};


module.exports = {
  updateVenuePresisi,
};
