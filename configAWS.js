const aws = require('aws-sdk');

module.exports = {
  configByFile(pathConfig) {
    aws.config.loadFromPath(pathConfig);
  },
  config(accessKeyId, secretAccessKey, region) {
    aws.config.update({ accessKeyId, secretAccessKey, region });
  },
};
