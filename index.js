const dynamoDBCSV = require('./dynamoDBCSV');

module.exports = {
  config: dynamoDBCSV.config,
  configByFile: dynamoDBCSV.configByFile,
  import: dynamoDBCSV.import,
  export: dynamoDBCSV.export,
};
