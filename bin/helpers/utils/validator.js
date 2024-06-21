const wrapper = require('./wrapper');
const { BadRequestError } = require('../error');

const isValidPayload = (payload, constraint) => {
  const { value, error } = constraint.validate(payload);
  if (error){
    const message = error.details[0].message.replace(/"/g, '');
    // const message = error.details[0].message.replace(/"/g, '');
    return wrapper.error(new BadRequestError(message));
  }
  return wrapper.data(value, 'success', 200);
};

const isValidPayloadBulkMessage = (payload, constraint) => {
  const { value, error } = constraint.validate(payload, {
    abortEarly: false, // Set to false to collect all errors
  });
  if (error) {
    const validationErrors = error.details.map(detail => {
          let key = detail.context.key;
          if (detail.path[0] === 'venue') {
              key = 'popup';
          } else if (['type','size','path'].includes(detail.context.key)) {
              key = detail.path[0];
          } else if (detail.path[0] === 'companyIdentity') {
              key = 'ossData';
              detail.message = 'Mohon lengkapi identitas perusahaan terlebih dahulu';
          }
          return ({key: key, label: detail.context.label, message: detail.message.replace(/"/g, '')});
        }
    );

    validationErrors.errorStatus = true;
    return wrapper.errorWithData(new BadRequestError('Silahkan perbaiki form'), validationErrors);
  }
  return wrapper.data(value, 'success', 200);
};


module.exports = {
  isValidPayload,
  isValidPayloadBulkMessage,
};
