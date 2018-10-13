# nodejs-aws-utils
> Utilities function to work with AWS

nodejs-aws-utils makes life easier in Amazon Web Services by providing the helpers for CRUD **s3 bucket**, exporting/importing **DynamoDB** data, creating **CloudFront** distribution and all functions will return a **promise**.

## Installation 
The easiest way to use nodejs-aws-utils is to install it from npm.
```sh
npm i nodejs-aws-utils --save
```

## Configuration
Using default configuration: 
```js
const awsUtils = require('nodejs-aws-utils');
awsUtils.config('ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'REGION');
```
Using a file configuration:
```js
const awsUtils = require('nodejs-aws-utils');
awsUtils.configByFile('path');
```
## DynamoDB
Import CSV file to DynamoDB:
```js
const awsUtils = require('./index');
awsUtils.dynamoDB.importCSV('table_name', './dat.csv')
  .then((data) => {
    console.log('Success', data);
  })
  .catch(err => console.log(err.stack));
```
Export CSV file from DynamoDB:
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
List buckets:
```js
awsUtils.bucket.list()
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Create s3 bucket:
```js
awsUtils.bucket.create('bucket_name')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Upload file to s3 bucket:
```js
awsUtils.bucket.uploadFile('bucket_name', './pic.png')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
## CloudFront
Create distribution by default configuration:
```js
awsUtils.cloudFront.createDistributionDefault({
  id: 'example_name_id',
  domainName: 'examplename.s3.amazonaws.com',
}).then(data => console.log(data))
  .catch(err => console.log(err));
```
Create distribution with [parameters]((https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html#createDistribution-property)):
```js
awsUtils.cloudFront.createDistribution(parameters)
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Get distribution's default configuration: 
```js
awsUtils.cloudFront.getDistributionConfig();
```
Set distribution's configuration: 
```js
awsUtils.cloudFront.setDistributionConfig();
```

## Release history

**1.1.0** - 13/10/2018 

* Import/export the DynamoDB data
* Create, list a S3 Bucket and upload the files there
* Create the CloudFront Distribution

## Meta
Ymese Team - Ymese.com
Distributed under the APACHE license. See LICENSE for more information.
