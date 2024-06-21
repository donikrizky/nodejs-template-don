const collection = 'venues';

class Query {

  constructor(db) {
    this.db = db;
  }

  async findOne(parameter, projection) {
    return this.db.findOne(parameter, projection, collection);
  }

  async findMany(parameter, projection, sort, page, limit) {
    return this.db.findMany(parameter, projection, sort, page, limit, collection);
  }

  async count(parameter) {
    return this.db.countData(parameter, collection);
  }
}

module.exports = Query;
