const dynamoDBCSV = require('./dynamoDBCSV');
const config = require('./configAWS');
const bucket = require('./bucketS3Util');

module.exports = {
  config: config.config,
  configByFile: config.configByFile,
  dynamoDB: {
    importCSV: dynamoDBCSV.importCSV,
    exportCSV: dynamoDBCSV.exportCSV,
  },
  bucket: {
    list: bucket.list,
    uploadFile: bucket.uploadFile,
    create: bucket.create,
  },
};
