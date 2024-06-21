
const commandHandler = require('../repositories/commands/command_handler');
const validator = require('../../../helpers/utils/validator');
const { sendResponse } = require('../../../helpers/utils/response');


// Command
const updateVenuePresisi = async (req, res) => {
  const result = await commandHandler.updateVenuePresisi();
  return sendResponse(result, res);
};

module.exports = {
  //command
  updateVenuePresisi,
  //query
};
