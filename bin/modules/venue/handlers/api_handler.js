const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../../../helpers/utils/validator');
const { sendResponse, paginationResponse } = require('../../../helpers/utils/response');
const validate = require('validate.js');

// Command

// Query
const getVenueById = async (req, res) => {
  const { params } = req;
  const isValid = await validator.isValidPayload(params, queryModel.getVenueById);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getVenueById({ ...data });
  return sendResponse(result, res);
};

const getVenueBanners = async (req, res) => {
  const { params } = req;
  const isValid = await validator.isValidPayload(params, queryModel.getVenueBanners);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getVenueBanners({ ...data });
  return paginationResponse(result, res);
};

const getVenueByRegion = async (req, res) => {
  const { query } = req;
  query.except = validate.isString(query.except) ? JSON.parse(query.except) : query.except;

  const isValid = await validator.isValidPayload(query, queryModel.getVenueByRegion);
  if (isValid.err) {
    return sendResponse(isValid, res);
  }
  const { data } = isValid;
  const result = await queryHandler.getVenueByRegion({ ...data });
  return paginationResponse(result, res);
};


module.exports = {
  getVenueById,
  getVenueBanners,
  getVenueByRegion,
};
