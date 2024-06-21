const collection = 'venues-presisi';
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOne(document) {
    return this.db.insertOne(document, collection);
  }

  async updateOne(parameter, document) {
    return this.db.updateOne(parameter, document, collection);
  }

  async deleteMany(parameter) {
    return this.db.deleteMany(parameter, collection);
  }
}

module.exports = Command;
