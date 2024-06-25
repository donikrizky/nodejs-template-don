const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const {NotFoundError, InternalServerError, BadRequestError} = require('../../../../helpers/error');
const validate = require('validate.js');

const QueryPip = require('./query');

const ctx = 'Pip-Query-Domain';

class Pip {

  constructor(db) {
    this.queryPip = new QueryPip(db);
  }

  async getNIKFamiliesByNIK(payload) {
    // const event = await this.queryPip.findOne({ eventId: payload.eventId }, { _id: 0 });
    // if (event.err) {
    //   logger.error(ctx, event.err, 'can not find event by id');
    //   return wrapper.error(new NotFoundError('can not find event by id'));
    // }
    // const eventData = event.data;

    const response = [
      {
        name: 'Rasyifa Damartya',
        nik: 1300192718282718
      },
      {
        name: 'Aldiron Pixel',
        nik: 1300192718282718
      },
      {
        name: 'Bryan Pixel',
        nik: 1300192718282718
      },
    ];
    return wrapper.data(response);
  }

}

module.exports = Pip;
