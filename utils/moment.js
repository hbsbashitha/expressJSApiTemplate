const moment = require('moment');

function formatDate(dateString) {
  return moment(dateString).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = { formatDate };
