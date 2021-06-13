const AWS = require('aws-sdk');
const { v4: uuidv4 }  = require('uuid');
const randomWords = require('random-words');

const REGION = process.env.AWS_REGION ||'us-east-1';
const WORDS_TABLE_NAME = process.env.WORDS_TABLE_NAME || 'words';

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: REGION });

const handler = async () => {

  try {
    let words = randomWords(25);
    words = words.map(word => {
        return {
            PutRequest: {
                Item: {
                    id: uuidv4(),
                    word
                }
            }
        }
    });

    let batchWriteParams = {
        RequestItems: {
            [WORDS_TABLE_NAME]: words
        }
    };
  
    const insert = await ddb.batchWrite(batchWriteParams).promise();

    console.info(insert);
    
    return { statusCode: 200, body: insert};

  } catch (err) {
    return { statusCode: 500, body: 'Failed to insert words: ' + JSON.stringify(err) };
  }

};

exports.handler = handler;