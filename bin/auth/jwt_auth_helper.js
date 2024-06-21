const jwt = require('jsonwebtoken');
const wrapper = require('../helpers/utils/wrapper');
const { ERROR } = require('../helpers/http-status/status_code');
const { ForbiddenError } = require('../helpers/error');

const getToken = (headers) => {
  if (String(headers?.authorization).startsWith('Bearer ')) {
    const token = headers.authorization;
    return token.substring(7, token.length);
  }
  return undefined;
};

const decodeToken = async (req, res) => {
  const result = { err: null, data: null };
  const token = getToken(req.headers);
  if (!token) {
    result.err = new ForbiddenError('Invalid authorization!');
    return wrapper.response(res, 'fail', result, 'Invalid authorization!', ERROR.FORBIDDEN);
  }

  req.decodedToken = jwt.decode(token);
}


module.exports = {
  decodeToken,
};
