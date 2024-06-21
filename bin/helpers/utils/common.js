
// const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../../infra/configs/global_config');
const saltRounds = parseInt(config.get('/crypto/saltRounds'), 10);

// const generateHash = (plain) => bcrypt.hash(plain, saltRounds);
// const compareHash = (plain, hash) => bcrypt.compare(plain, hash);

const encrypt = async (text, algorithm, secretKey) => {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = async (text, algorithm, secretKey) => {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = {
  // generateHash,
  // compareHash,
  encrypt,
  decrypt
};
