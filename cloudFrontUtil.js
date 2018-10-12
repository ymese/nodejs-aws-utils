const aws = require('aws-sdk');
const fs = require('fs');

let distributionConfig = JSON.parse(
  fs.readFileSync('./resources/configDistributionCloudFront.json', 'utf8'),
);

module.exports = {
  createDistributionDefault({ id, domainName }) {
    const cloudFront = new aws.CloudFront({ apiVersion: '2018-06-18' });
    distributionConfig.DistributionConfig.Origins.Items[0].Id = id;
    distributionConfig.DistributionConfig.Origins.Items[0].DomainName = domainName;
    distributionConfig.DistributionConfig.DefaultCacheBehavior.TargetOriginId = id;
    distributionConfig.DistributionConfig.CallerReference = Date.now().toString();
    return cloudFront.createDistribution(distributionConfig).promise();
  },
  createDistribution(params) {
    const cloudFront = new aws.CloudFront({ apiVersion: '2018-06-18' });
    return cloudFront.createDistribution(params).promise();
  },
  getDistributionConfig() {
    return distributionConfig;
  },
  setDistributionConfig(params) {
    distributionConfig = params;
  },
};
