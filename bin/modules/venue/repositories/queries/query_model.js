const joi = require('joi');

const getVenueBanners = joi.object().keys({
  isDeleted: joi.bool().optional().default(false),
  page: joi.number().integer().default(1),
  limit: joi.number().integer().default(100)
});

const getVenueByRegion = joi.object().keys({
  isDeleted: joi.bool().optional().default(false),
  page: joi.number().integer().default(1),
  limit: joi.number().integer().default(100),
  regionId: joi.number().default(0),
  except: joi.array().items(joi.string()).default([])
});

const getVenueById = joi.object().keys({
  isDeleted: joi.bool().optional().default(false),
  venueId: joi.string().required()
});

module.exports = {
  getVenueById,
  getVenueBanners,
  getVenueByRegion
};
