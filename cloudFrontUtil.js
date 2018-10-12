const aws = require('aws-sdk');

let distributionConfig = {
  DistributionConfig: {
    Comment: '',
    CacheBehaviors: {
      Quantity: 0,
    },
    Logging: {
      Bucket: '',
      Prefix: '',
      Enabled: false,
      IncludeCookies: false,
    },
    Origins: {
      Items: [
        {
          OriginPath: '',
          CustomOriginConfig: {
            OriginProtocolPolicy: 'http-only',
            HTTPPort: 80,
            HTTPSPort: 443,
          },
          Id: '',
          DomainName: '',
        },
      ],
      Quantity: 1,
    },
    PriceClass: 'PriceClass_All',
    Enabled: true,
    DefaultCacheBehavior: {
      TrustedSigners: {
        Enabled: false,
        Quantity: 0,
      },
      TargetOriginId: '',
      ViewerProtocolPolicy: 'allow-all',
      ForwardedValues: {
        Headers: {
          Quantity: 0,
        },
        Cookies: {
          Forward: 'none',
        },
        QueryString: false,
      },
      SmoothStreaming: false,
      AllowedMethods: {
        Items: ['GET', 'HEAD'],
        CachedMethods: {
          Items: ['GET', 'HEAD'],
          Quantity: 2,
        },
        Quantity: 2,
      },
      MinTTL: 0,
    },
    CallerReference: '',
    CustomErrorResponses: {
      Quantity: 0,
    },
    Restrictions: {
      GeoRestriction: {
        RestrictionType: 'none',
        Quantity: 0,
      },
    },
    Aliases: {
      Quantity: 0,
    },
  },
};


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
