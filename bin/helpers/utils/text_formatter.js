const { format } = require('date-fns');
const { id } = require('date-fns/locale');

const formatDate = (isoDate) => {
  return format(new Date(isoDate), 'dd/MM/yyyy', {locale: id});
};

const formatDateReverse = (isoDate) => {
  return format(new Date(isoDate), 'yyyy-MM-dd', {locale: id});
};

const formatShortMonthDate = (isoDate) => {
  return format(new Date(isoDate), 'dd MMM yyyy', {locale: id});
};

const formatDateTime = (isoDate) => {
  return format(new Date(isoDate), 'dd/MM/yyyy HH:mm:ss', {locale: id });
};

const formatTimestamp = (isoDate) => {
  return format(new Date(isoDate), 'yyyyMMddHHmmss', {locale: id});
};

const formatThousand = (value) => {
  return `${parseFloat(value).toLocaleString('en').replace(/,/g, '.')},00`;
};

const capitalizeFirstSentence = (str) => {
  return str.replace(str[0], str[0].toUpperCase());
};

const formatPhoneNumber = (str) => {
  return str.replace(/\D+/g, '').replace(/^((08){1}|(8){1})/g, '628'); // nosonar
};

const replaceInvalidCharactersAndSpaces = (inputString) => {
  const invalidCharacterPattern = /[\/:*?"<>|]/g; // Add 'g' flag to replace all occurrences
  const spacePattern = /\s+/g; // Add 'g' flag to replace all occurrences
  return inputString
      .replace(invalidCharacterPattern, '_') // Replace invalid characters
      .replace(spacePattern, '_');  // Replace spaces with underscores
}

const replaceInvalidCharacters = (inputString) => {
  const invalidCharacterPattern = /[\/:*?"<>|]/g; // Add 'g' flag to replace all occurrences
  return inputString
      .replace(invalidCharacterPattern, '_');  // Replace invalid characters
}

module.exports = {
  formatDate,
  formatShortMonthDate,
  formatDateTime,
  formatThousand,
  formatTimestamp,
  capitalizeFirstSentence,
  formatPhoneNumber,
  replaceInvalidCharactersAndSpaces,
  replaceInvalidCharacters,
  formatDateReverse,
};
