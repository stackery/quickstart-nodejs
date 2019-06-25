const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  // Get items from the ItemTable
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.TABLE_NAME
  };

  try {
    items = await dynamodb.scan(params).promise();
    console.log(`Getting data from table ${process.env.TABLE_NAME}.`);
  } catch (error) {
    console.log(`Error getting data from table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
    throw new Error(error); // stop execution if data from dynamodb not available
  }

  return {
    itemCount: items.length,
    items: items
  };
};
