const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const aws = require('aws-sdk');
const path = require('path');
const csvToJson = require('csvtojson');

function generateDataDynamoDB(tableName, data, isRecord = false) {
  const params = {
    RequestItems: {
    },
  };
  params.RequestItems[tableName] = [];
  data.forEach((element) => {
    const item = {
      PutRequest: {
        Item: isRecord === true ? element : aws.DynamoDB.Converter.marshall(element),
      },
    };
    params.RequestItems[tableName].push(item);
  });
  return params;
}

// Remove string empty and format boolean value
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

function batchWritePromise(dynamoDB, params) {
  return new Promise((resolve, reject) => {
    dynamoDB.batchWriteItem(params, (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
}


// Data is not clear when convert csv to json. All values are string.
function bulkData(tableName, data) {
  const dynamoDB = new aws.DynamoDB();
  const promises = [];
  for (let i = 0; i < data.length; i += 25) {
    const params = generateDataDynamoDB(tableName, standardizedObject(data.slice(i, i + 25)));
    promises.push(batchWritePromise(dynamoDB, params));
    // fs.appendFileSync('./raw.json',JSON.stringify(params), 'utf8');
    console.log(params.RequestItems.pda_license[0].PutRequest.Item);
    break;
  }
  // return Promise.all(promises);
}

function bulkDataRecord(tableName, data) {
  const dynamoDB = new aws.DynamoDB();
  const promises = [];
  for (let i = 0; i < data.length; i += 25) {
    const params = generateDataDynamoDB(tableName,
      standardizedObject(data.slice(i, i + 25)), true);
    promises.push(batchWritePromise(dynamoDB, params));
  }
  return Promise.all(promises);
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
      const temp = aws.DynamoDB.Converter.unmarshall(element);
      if (Object.keys(temp).length > fields.length) {
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
  exportRecord(params, locationFile) {
    const dynamoDB = new aws.DynamoDB();
    return dynamoDB.scan(params).promise()
      .then((response) => {
        fs.writeFileSync(locationFile, JSON.stringify(response.Items));
        if (fs.existsSync(locationFile)) {
          return Promise.resolve(true);
        }
        return Promise.reject(new Error('error'));
      }).catch(err => Promise.reject(err));
  },
  importRecord(tableName, jsonFilePath) {
    const dataRecord = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    console.log(dataRecord.length);
    return bulkDataRecord(tableName, dataRecord);
  },
};
