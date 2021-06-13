# random-word-api
get a random word from a socket

### deploy to AWS with
> sam deploy --guided
### populate the dynamo table named "words"
#### run "populate" lambda function into the lambda console in order to populate words table,
#### you will get this response as success
> UnprocessedItems": {}
### we could use wscat to connect
> npm install -g wscat
### connect to socket
> wscat -c wss://{YOUR-API-ID}.execute-api.{YOUR-REGION}.amazonaws.com/dev
### send "sendmessage" action as json payload
> {"action":"sendmessage"}
### we get a random word :)
> water