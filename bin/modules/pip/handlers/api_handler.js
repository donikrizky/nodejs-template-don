
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../../../helpers/utils/validator');
const { sendResponse } = require('../../../helpers/utils/response');


// Command
const getNIKFamiliesByNIK = async (req, res) => {
  const result = await queryHandler.getNIKFamiliesByNIK();
  return sendResponse(result, res);
};

module.exports = {
  //command
  //query
  getNIKFamiliesByNIK,
};
