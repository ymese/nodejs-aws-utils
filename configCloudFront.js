module.exports = {
  DistributionConfig: { /* required */
    CallerReference: 'STRING_VALUE', /* required */
    Comment: 'STRING_VALUE', /* required */
    DefaultCacheBehavior: { /* required */
      ForwardedValues: { /* required */
        Cookies: { /* required */
          Forward: 'none', // | whitelist | all, /* required */
          WhitelistedNames: {
            Quantity: 0, /* required */
            Items: [
              'STRING_VALUE',
              /* more items */
            ],
          },
        },
        QueryString: false, // || true, /* required */
        Headers: {
          Quantity: 0, /* required */
          Items: [
            'STRING_VALUE',
            /* more items */
          ],
        },
        QueryStringCacheKeys: {
          Quantity: 0, /* required */
          Items: [
            'STRING_VALUE',
            /* more items */
          ],
        },
      },
      MinTTL: 0, /* required */
      TargetOriginId: 'STRING_VALUE', /* required */
      TrustedSigners: { /* required */
        Enabled: true, // || false, /* required */
        Quantity: 0, /* required */
        Items: [
          'STRING_VALUE',
          /* more items */
        ],
      },
      ViewerProtocolPolicy: 'allow-all', // | https-only | redirect-to-https, /* required */
      AllowedMethods: {
        Items: [ /* required */
          'GET', 'HEAD', // | POST | PUT | PATCH | OPTIONS | DELETE,
          /* more items */
        ],
        Quantity: 0, /* required */
        CachedMethods: {
          Items: [ /* required */
            'GET', 'HEAD', // | POST | PUT | PATCH | OPTIONS | DELETE,
            /* more items */
          ],
          Quantity: 0, /* required */
        },
      },
      Compress: false, // || true,
      DefaultTTL: 0,
      LambdaFunctionAssociations: {
        Quantity: 0, /* required */
        Items: [
          {
            EventType: 'viewer-request', // | viewer-response | origin-request | origin-response,
            LambdaFunctionARN: 'STRING_VALUE',
          },
          /* more items */
        ],
      },
      MaxTTL: 0,
      SmoothStreaming: false, // || true
    },
    Enabled: false, // || false, /* required */
    Origins: { /* required */
      Quantity: 0, /* required */
      Items: [
        {
          DomainName: 'STRING_VALUE', /* required */
          Id: 'STRING_VALUE', /* required */
          CustomHeaders: {
            Quantity: 0, /* required */
            Items: [
              {
                HeaderName: 'STRING_VALUE', /* required */
                HeaderValue: 'STRING_VALUE', /* required */
              },
              /* more items */
            ],
          },
          CustomOriginConfig: {
            HTTPPort: 0, /* required */
            HTTPSPort: 0, /* required */
            OriginProtocolPolicy: 'http-only', // | match-viewer | https-only, /* required */
            OriginKeepaliveTimeout: 0,
            OriginReadTimeout: 0,
            OriginSslProtocols: {
              Items: [ /* required */
                'SSLv3', // | TLSv1 | TLSv1.1 | TLSv1.2,
                /* more items */
              ],
              Quantity: 0, /* required */
            },
          },
          OriginPath: 'STRING_VALUE',
          S3OriginConfig: {
            OriginAccessIdentity: 'STRING_VALUE', /* required */
          },
        },
        /* more items */
      ],
    },
    Aliases: {
      Quantity: 0, /* required */
      Items: [
        'STRING_VALUE',
        /* more items */
      ],
    },
    CacheBehaviors: {
      Quantity: 0, /* required */
      Items: [
        {
          ForwardedValues: { /* required */
            Cookies: { /* required */
              Forward: 'none', // | whitelist | all, /* required */
              WhitelistedNames: {
                Quantity: 0, /* required */
                Items: [
                  'STRING_VALUE',
                  /* more items */
                ],
              },
            },
            QueryString: false, // || true, /* required */
            Headers: {
              Quantity: 0, /* required */
              Items: [
                'STRING_VALUE',
                /* more items */
              ],
            },
            QueryStringCacheKeys: {
              Quantity: 0, /* required */
              Items: [
                'STRING_VALUE',
                /* more items */
              ],
            },
          },
          MinTTL: 0, /* required */
          PathPattern: 'STRING_VALUE', /* required */
          TargetOriginId: 'STRING_VALUE', /* required */
          TrustedSigners: { /* required */
            Enabled: true || false, /* required */
            Quantity: 0, /* required */
            Items: [
              'STRING_VALUE',
              /* more items */
            ],
          },
          ViewerProtocolPolicy: 'allow-all', // | https-only | redirect-to-https, /* required */
          AllowedMethods: {
            Items: [ /* required */
              'GET', 'HEAD', // | POST | PUT | PATCH | OPTIONS | DELETE,
              /* more items */
            ],
            Quantity: 0, /* required */
            CachedMethods: {
              Items: [ /* required */
                'GET', 'HEAD', // | POST | PUT | PATCH | OPTIONS | DELETE,
                /* more items */
              ],
              Quantity: 0, /* required */
            },
          },
          Compress: true || false,
          DefaultTTL: 0,
          LambdaFunctionAssociations: {
            Quantity: 0, /* required */
            Items: [
              {
                EventType: 'viewer-request', // | viewer-response | origin-request | origin-response,
                LambdaFunctionARN: 'STRING_VALUE',
              },
              /* more items */
            ],
          },
          MaxTTL: 0,
          SmoothStreaming: false, // || false
        },
        /* more items */
      ],
    },
    CustomErrorResponses: {
      Quantity: 0, /* required */
      Items: [
        {
          ErrorCode: 0, /* required */
          ErrorCachingMinTTL: 0,
          ResponseCode: 'STRING_VALUE',
          ResponsePagePath: 'STRING_VALUE',
        },
        /* more items */
      ],
    },
    DefaultRootObject: 'STRING_VALUE',
    HttpVersion: 'http1.1', // | http2,
    IsIPV6Enabled: true || false,
    Logging: {
      Bucket: 'STRING_VALUE', /* required */
      Enabled: true || false, /* required */
      IncludeCookies: true || false, /* required */
      Prefix: 'STRING_VALUE', /* required */
    },
    PriceClass: 'PriceClass_All', // PriceClass_100 | PriceClass_200 |
    Restrictions: {
      GeoRestriction: { /* required */
        Quantity: 0, /* required */
        RestrictionType: 'none', // blacklist | whitelist | , /* required */
        Items: [
          'STRING_VALUE',
          /* more items */
        ],
      },
    },
    ViewerCertificate: {
      ACMCertificateArn: 'STRING_VALUE',
      Certificate: 'STRING_VALUE',
      CertificateSource: 'cloudfront', // | iam | acm,
      CloudFrontDefaultCertificate: true || false,
      IAMCertificateId: 'STRING_VALUE',
      MinimumProtocolVersion: 'SSLv3', // | TLSv1,
      SSLSupportMethod: 'sni - only', // | vip,
    },
    WebACLId: 'STRING_VALUE',
  },
};
