const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true, allow_underscores: true })) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports = { validateURL };
