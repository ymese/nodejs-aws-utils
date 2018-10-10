const dynamoDBCSV = require('./dynamoDBCSV');

module.exports = {
  import: dynamoDBCSV.import,
  export: dynamoDBCSV.export,
};
