const dynamoDB = require('./dynamoDBCSV');
const config = require('./configAWS');
const bucket = require('./bucketS3Util');
const cloudFront = require('./cloudFrontUtil');

module.exports = {
  config: config.config,
  configByFile: config.configByFile,
  dynamoDB,
  bucket,
  cloudFront,
};
