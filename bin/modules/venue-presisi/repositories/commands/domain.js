const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');
const config = require('../../../../infra/configs/global_config');
const { InternalServerError } = require('../../../../helpers/error');
const axios = require('axios');
const validate = require('validate.js');

const CommandVenuesPresisi = require('./command');
const tokenIzinKeramaian = config.get('/tokenIzinKeramaian');

const ctx = 'VenuesPresisi-Command-Domain';

class VenuesPresisi {

  constructor(db) {
    this.commandVenuesPresisi = new CommandVenuesPresisi(db);
  }

  async updateVenuePresisi () {
    const apiUrl = `https://izin-keramaian.presisi.io/dev/perizinan/list_tempat`;
    const headers = {
      'token': tokenIzinKeramaian,
    };

    try {
      const { status, data } = await axios.get(apiUrl, { headers });
      if (status && data.status) {
        await this.commandVenuesPresisi.deleteMany({})
        data.data.forEach( perProvinsi => this.commandVenuesPresisi.insertOne(perProvinsi))
      }

      return wrapper.data('success update venue-presisi' );
    } catch (e) {
      logger.error(e);
      return wrapper.error(e.message);
    }

  }

}

module.exports = VenuesPresisi;