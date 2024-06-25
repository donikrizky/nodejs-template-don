const logger = require('../../../../helpers/utils/logger');
const wrapper = require('../../../../helpers/utils/wrapper');

const CommandPip = require('./command');

const ctx = 'Pip-Command-Domain';

class Pip {

  constructor(db) {
    this.commandPip = new CommandPip(db);
  }

}

module.exports = Pip;
