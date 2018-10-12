# Nodejs-aws-utils
> Utilities function to work with AWS

Nodejs-aws-utils makes aws-sdk easier by provide a libary for **s3 bucket**, **dynamoDB**, **CloudFront** and support **promise**

## Installation 
The easiest way to use nodejs-aws-utils is to install it from npm 
```sh
npm i nodejs-aws-utils --save
```

## Config
Config default : 
```js
const awsUtils = require('nodejs-aws-utils');
awsUtils.config('ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'REGION');
```
Config by file:
```js
const awsUtils = require('nodejs-aws-utils');
awsUtils.configByFile('path');
```
## DynamoDB
Import csv file to dynamoDB :
```js
const awsUtils = require('./index');
awsUtils.dynamoDB.importCSV('table_name', './dat.csv')
  .then((data) => {
    console.log('Success', data);
  })
  .catch(err => console.log(err.stack));
```
Export csv file from dynamoDB :
```js
const awsUtils = require('./index');
awsUtils.dynamoDB.exportCSV({ TableName: 'table_name' }, './dat.csv')
  .then((status) => {
    if (status === true) {
      console.log('Success');
    } else {
      console.log('Fail');
    }
});

```
## S3 buckets
List buckets :
```js
awsUtils.bucket.list()
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Create s3 bucket :
```js
awsUtils.bucket.create('bucket_name')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Upload file to s3 bucket :
```js
awsUtils.bucket.uploadFile('bucket_name', './pic.png')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
## CloudFront
Create distribution default :
```js
awsUtils.cloudFront.createDistributionDefault({
  id: 'example_name_id',
  domainName: 'examplename.s3.amazonaws.com',
}).then(data => console.log(data))
  .catch(err => console.log(err));
```
Create distribution with [parameters]((https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html#createDistribution-property)) :
```js
awsUtils.cloudFront.createDistribution(parameters)
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Get distribution config default: 
```js
awsUtils.cloudFront.getDistributionConfig();
```
Set distribution config: 
```js
awsUtils.cloudFront.setDistributionConfig();
```

## Release history

## Meta
Ymese Team - Ymese.com
Distributed under the APACHE license. See LICENSE for more information.