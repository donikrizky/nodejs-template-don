const Venue = require('./domain');
const config = require('../../../../infra/configs/global_config');

// Mongo
const DB = require('../../../../helpers/databases/mongodb/db');
const db = new DB(config.get('/mongoDbUrl'));

const venue = new Venue(db);

const getVenueById = async (payload) => {
  return venue.getVenueById(payload);
};

const getVenueBanners = async (payload) => {
  return venue.getVenueBanners(payload);
};

const getVenueByRegion = async (payload) => {
  return venue.getVenueByRegion(payload);
};

module.exports = {
  getVenueBanners,
  getVenueById,
  getVenueByRegion,
};
