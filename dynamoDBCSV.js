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


function standardizedObject(data) {
  data.forEach((dataElement, index) => {
    Object.keys(dataElement).forEach((keyElement) => {
      if (dataElement[keyElement] === '') { delete data[index][keyElement]; }
      if (dataElement[keyElement] === 'false') {
        dataElement[keyElement] = false;
      }
      if (dataElement[keyElement] === 'true') {
        dataElement[keyElement] = true;
      }
    });
  });
  return data;
}

function batchWritePromise(dynamoDB, params){
  return new Promise((resolve,reject) => {
    dynamoDB.batchWriteItem(params, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })

  });
}


function bulkData(tableName, data) {
  const dynamoDB = new aws.DynamoDB();
  let promises = [];
  for (let i = 0; i < data.length ; i+=25){
    let params = generateDataDynamoDB(tableName, standardizedObject(data.slice(i, i + 25)));
    // console.log(params.RequestItems.pda_license[0].PutRequest.Item);
    promises.push(batchWritePromise(dynamoDB, params));
  }
  Promise.all(promises).then(values => {
    console.log(values);
  }).catch(err => console.log(err));
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
    let fields = [];
    items.forEach((element) => {
      let temp = aws.DynamoDB.Converter.unmarshall(element);
      if (Object.keys(temp).length > fields.length){
        fields = Object.keys(temp);
      }
      records.push(temp);
    });
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
