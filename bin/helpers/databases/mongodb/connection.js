const { MongoClient, ClientSession } = require('mongodb');
const config = require('../../../infra/configs/global_config');
const logger = require('../../utils/logger');
const wrapper = require('../../utils/wrapper');

let mongoConnection;

const init = async () => {
  try {
    mongoConnection = new MongoClient(config.get('/mongoDbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 50,
      minPoolSize: 1
    });
    await mongoConnection.connect();
    logger.info('mongodb connection', 'connected', 'database initiation');
  } catch (err) {
    logger.error('mongodb connection', 'connection error', 'database initiation', err);
  }
};

const getConnection = async () => {
  return wrapper.data({ db: mongoConnection });
};

module.exports = {
  init,
  getConnection
};
