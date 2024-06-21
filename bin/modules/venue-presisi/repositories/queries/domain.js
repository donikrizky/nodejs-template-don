
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError, InternalServerError, BadRequestError } = require('../../../../helpers/error');
const validate = require('validate.js');

const QueryVenuePresisi = require('./query');

const ctx = 'VenuesPresisi-Query-Domain';

class VenuesPresisi {

  constructor(db) {
    this.queryVenuePresisi = new QueryVenuePresisi(db);
  }

  async getEventById(payload) {
    const event = await this.queryVenuePresisi.findOne({ eventId: payload.eventId }, { _id: 0 });
    if (event.err) {
      logger.error(ctx, event.err, 'can not find event by id');
      return wrapper.error(new NotFoundError('can not find event by id'));
    }
    const eventData = event.data;

    return wrapper.data(eventData);
  }

}

module.exports = VenuesPresisi;