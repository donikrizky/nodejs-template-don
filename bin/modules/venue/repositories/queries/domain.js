const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const config = require('../../../../infra/configs/global_config');
const { NotFoundError } = require('../../../../helpers/error');

const QueryVenue = require('./query');

const ctx = 'Venue-Query-Domain';

class Venue {

  constructor(db) {
    this.queryVenue = new QueryVenue(db);
  }

  async getVenueById(payload) {
    const venue = await this.queryVenue.findOne({ venueId: payload.venueId }, {_id: 0});
    if (venue.err) {
      logger.error(ctx, venue.err, 'can not find venue by id');
      return wrapper.error(new NotFoundError('can not find venue by id'));
    }

    const { data } = venue;
    return wrapper.data(data);
  }

  async getVenueBanners(payload) {
    const {page, limit, ...payloadProperties} = payload;
    const query = {...payloadProperties};
    const projection = {
      venueId: 1,
      venueName: 1,
      bannerPicPath: 1,
      isActive: 1,
      isDefault: 1,
      email: 1,
      phone: 1,
      _id: 0,
    };
    const sort = { createdAt : -1 };
    const venue = await this.queryVenue.findMany(query, projection, sort, page, limit);
    if (venue.err) {
      logger.warn(ctx, venue.err, 'can not find venue banner');
      venue.data = [];
    }

    let pic = {};
    for (let i=0; i < venue.data.length; i++){
      venue.data[i].bannerPic = pic.data;
    }

    const { data } = venue;
    return wrapper.data(data);
  }

  async getVenueByRegion(payload) {
    const {page, limit } = payload;
    const projection = {
      venueId: 1,
      venueName: 1,
      isActive: 1,
      _id: 0,
    };
    const sort = { createdAt : -1 };
    let query  = {};
    if (payload.except.length > 0) {
      query["venueId"] = { $nin: payload.except }
    }

    const venue = await this.queryVenue.findMany(query, projection, sort, page, limit);

    if (venue.err) {
      logger.warn(ctx, venue.err, 'can not find venue by region');
      venue.data = [];
    }
    const { data } = venue;
    return wrapper.data(data);
  }

}

module.exports = Venue;
