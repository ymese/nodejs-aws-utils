const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const aws = require('aws-sdk');
const path = require('path');
const csvToJson = require('csvtojson');

aws.config.loadFromPath(`${__dirname}/config.json`);

const dynamoDB = new aws.DynamoDB();

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
  const params = generateDataDynamoDB(tableName, data);
  console.log(params);
  dynamoDB.batchWriteItem(params, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Imported');
    }
  });
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
  } catch (err) {
    throw err;
  }
}

module.exports = {
  export(tableName, locationFile) {
    const params = {
      TableName: tableName,
    };
    dynamoDB.scan(params, (error, data) => {
      if (error) {
        throw error;
      } else {
        const { Items: items } = data;
        try {
          const records = [];
          items.forEach((element) => {
            records.push(aws.DynamoDB.Converter.unmarshall(element));
          });
          const fields = Object.keys(records[0]);
          const parser = new Json2csvParser({ fields });
          const csv = parser.parse(records);
          createFile(locationFile, csv);
        } catch (err) {
          throw err;
        }
      }
    });
  },
  import(tableName, csvFilePath) {
    csvToJson()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        bulkData(tableName, jsonObj);
      });
  },
};
