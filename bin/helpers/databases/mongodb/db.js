
const mongoConnection = require('./connection');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const errorQueryMessage = 'Error querying MongoDB';
const errorEmptyMessage = 'Data Not Found Please Try Another Input';
const ctx = 'Database.MongoDB';

class DB {

  async getDatabase(collectionName) {
    const result = await mongoConnection.getConnection();
    const cacheConnection = result.data.db;
    const connection = cacheConnection.db();
    return connection.collection(collectionName);
  }

  async startSession() {
    const result = await mongoConnection.getConnection();
    const cacheConnection = result.data.db;
    return cacheConnection.startSession();
  }

  async findOne(parameter, projection, collectionName) {
    try {
      const db = await this.getDatabase(collectionName);
      const result = await db.findOne(parameter, { projection });
      if (!result) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'findOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async insertOne(document, collectionName, session) {
    try {
      const db = await this.getDatabase(collectionName);
      const result = await db.insertOne(document, {session});
      if (!result) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'insertOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async updateOne(parameter, updateQuery, collectionName) {
    try {
      const document = { $set: { ...updateQuery } };
      const db = await this.getDatabase(collectionName);
      const result = await db.updateOne(parameter, document);
      if (!result) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'updateOne', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async countData(parameter, collectionName) {
    try {
      const db = await this.getDatabase(collectionName);
      const result = await db.countDocuments(parameter);
      if (!result) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'countData', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async findMany(parameter, projection, sort, page, limit, collectionName, session) {
    try {
      const db = await this.getDatabase(collectionName);
      const skip = limit * (page - 1);
      const result = await db.find(parameter, { projection }, {session}).sort(sort).limit(limit).skip(skip).toArray();
      if (!result) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'findMany', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async aggregate(parameter, collectionName) {
    try {
      const db = await this.getDatabase(collectionName);
      const result = await db.aggregate(parameter).toArray();
      if (!result || result.length === 0) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'aggregate', err);
      return wrapper.error(errorQueryMessage);
    }
  }

  async deleteMany(parameter, collectionName, session) {
    try {
      const db = await this.getDatabase(collectionName);
      const result = await db.deleteMany(parameter, {session});
      if (!result) {
        return wrapper.error(errorEmptyMessage);
      }
      return wrapper.data(result);
    } catch (err) {
      logger.error(ctx, errorQueryMessage, 'deleteMany', err);
      return wrapper.error(errorQueryMessage);
    }
  }

}

module.exports = DB;
