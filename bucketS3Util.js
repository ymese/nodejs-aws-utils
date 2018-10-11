const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

module.exports = {
  list() {
    const s3 = new aws.S3();
    return s3.listBuckets().promise();
  },
  create(bucketName) {
    const s3 = new aws.S3();
    const bucketParams = {
      Bucket: bucketName,
    };
    return s3.createBucket(bucketParams).promise();
  },
  uploadFile(bucketName, fileName) {
    const s3 = new aws.S3();
    const uploadParams = { Bucket: bucketName, Key: '', Body: '' };
    const fileStream = fs.createReadStream(fileName);
    fileStream.on('error', (err) => {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(fileName);
    return s3.upload(uploadParams).promise();
  },
};
