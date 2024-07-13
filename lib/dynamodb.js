// lib/dynamodb.js
import AWS from 'aws-sdk';

const config = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const DynamoDB = new AWS.DynamoDB(config);
const DocumentClient = new AWS.DynamoDB.DocumentClient(config);

export { DynamoDB, DocumentClient };
