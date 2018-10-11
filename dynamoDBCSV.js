const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const aws = require('aws-sdk');
const path = require('path');
const csvToJson = require('csvtojson');

function generateDataDynamoDB(tableName, data) {
  const params = {
    RequestItems: {
    },
  };
  params.RequestItems[tableName] = [];
  data.forEach((element) => {
    const item = {
      PutRequest: {
        Item: aws.DynamoDB.Converter.marshall(element),
      },
    };
    params.RequestItems[tableName].push(item);
  });
  return params;
}

function bulkData(tableName, data) {
  const dynamoDB = new aws.DynamoDB();
  const params = generateDataDynamoDB(tableName, data);
  return dynamoDB.batchWriteItem(params).promise();
}

function createFile(locaFile, csv) {
  const locationFile = path.resolve(locaFile);
  try {
    if (fs.existsSync(path.dirname(locationFile))) {
      fs.writeFileSync(locationFile, csv);
    } else {
      fs.mkdirSync(path.dirname(locationFile));
      fs.writeFileSync(locationFile, csv);
    }
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(err);
  }
}

function csvFileToJson(data) {
  const { Items: items } = data;
  try {
    const records = [];
    items.forEach((element) => {
      records.push(aws.DynamoDB.Converter.unmarshall(element));
    });
    const fields = Object.keys(records[0]);
    const parser = new Json2csvParser({ fields });
    const csv = parser.parse(records);
    return Promise.resolve(csv);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  exportCSV(params, locationFile) {
    const dynamoDB = new aws.DynamoDB();
    return dynamoDB.scan(params).promise()
      .then(response => csvFileToJson(response))
      .then(csv => createFile(locationFile, csv));
  },
  importCSV(tableName, csvFilePath) {
    return csvToJson()
      .fromFile(csvFilePath)
      .then(jsonObj => bulkData(tableName, jsonObj));
  },
};
