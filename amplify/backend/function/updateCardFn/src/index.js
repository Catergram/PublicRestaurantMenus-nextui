/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_USERINTERACTIONTABLE_ARN
	API_CATERGRAM3_USERINTERACTIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
let graphqlClient;
var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

/* == Globals == */
var esDomain = {
    region:  process.env.REGION,
    endpoint: process.env.ES_ENDPOINT,
    index: 'cardpoint',
    doctype: 'doc'
};
var endpoint = new AWS.Endpoint(esDomain.endpoint);
var creds = new AWS.EnvironmentCredentials('AWS');


exports.handler = async (event, context) => {
    let env;
    let graphql_auth;

    env = process.env;
    graphql_auth = {
        type: "AWS_IAM",
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
        }
    };

    if (!graphqlClient) {
        graphqlClient = new AWSAppSyncClient({
            url: env.API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT,
            region: env.REGION,
            auth: graphql_auth,
            disableOffline: true,
        });
    }

    let userId = event.arguments.userId
    let cardId = event.arguments.cardId;

    if(event.arguments.espost) {
      const udoc = {
        id: cardId,
        body: {
            "script" : {
                "source": `ctx._source.dislike = params.dislike; ctx._source.like = params.like;`,
                "lang": "painless",
                "params" : {
                    "like" : event.arguments.espost.like,
                    "dislike": event.arguments.espost.dislike
                }
            },
            "retry_on_conflict": 8
        }
      }
      const esResponse = await postToES(udoc, context, true);
      console.log('Magnitude ====>>>>>', esResponse); 

      return {
        statusCode: 200,
        body: JSON.stringify('Updated Card'),
        id: cardId
      }
    }

    if(event.arguments.esget) {
      const resz = await getCardFromES(cardId);
      console.log('HERE', resz);

      return {
        statusCode: 200,
        body: JSON.stringify('Updated Card'),
        id: resz
      }
    }

    // Get User ID
    let owner = event.arguments.owner;
    console.log("event: ====>>>>", JSON.stringify(event));
    
    const likePayload = `if(ctx._source.dislike !== null && ctx._source.dislike.contains(params.tag) ) {ctx._source.dislike.remove(ctx._source.dislike.indexOf(params.tag))} if(ctx._source.like == null) { return ctx._source.like = [params.tag]} else {if(!ctx._source.like.contains(params.tag)) {ctx._source.like.add(params.tag);}}`
    const dislikePayload = `if( ctx._source.like !== null && ctx._source.like.contains(params.tag) ) { ctx._source.like.remove(ctx._source.like.indexOf(params.tag)) } if(ctx._source.dislike == null) { return ctx._source.dislike = [params.tag]} else {if(!ctx._source.dislike.contains(params.tag)) { ctx._source.dislike.add(params.tag);}}`


    const payload = event.arguments.likeOrDislike == 'Like' ? likePayload : dislikePayload;

    const time = new Date().toISOString();
    const adoc = {
      id: cardId,
      body: {
          "script" : {
              "source": payload,
              "lang": "painless",
              "params" : {
                  "tag" : userId,
                  "object": {
                    id: userId,
                    date: time
                  }
              }
          }
      }
    }

    console.log('--->> Start');
    const esResponse = await postToES(adoc, context);
    console.log('--------- DONE ES ---------', esResponse);


    let isLike = false;
    if(event.arguments.likeOrDislike === 'Like') {
        isLike = true;

        //update card mood value
        const currentCard =  await graphqlClient.query({
          query: gql(getCardPoint),
          variables: {
              id: cardId
          }
        });
        console.log(currentCard)

        if(currentCard.data.getCardPoint.cardPointMoodId){
            console.log('card has mood')
            const moodId = currentCard.data.getCardPoint.cardPointMoodId
            
            const userMoods = await graphqlClient.query({
              query: gql(getUserMoods),
              variables: {
                userId,
                moodId
              }
            });
            console.log(userMoods)
            console.log('moodId', moodId)
            console.log('userId' , userId)

            if(userMoods.data.listUserMoods.items.length){
              const userMoodId = userMoods.data.listUserMoods.items[0].id
              const moodValue = userMoods.data.listUserMoods.items[0].value
              console.log('update existing mood ', userMoodId)
              await graphqlClient.mutate({
                mutation: gql(updateUserMood),
                variables: {
                    input: {
                        id: userMoodId,
                        value: moodValue + 1
                    }
                }
            });
            } else {
              console.log('create new mood')
              await graphqlClient.mutate({
                mutation: gql(createUserMood),
                variables: {
                    input: {
                        userProfileMoodsId: userId,
                        moodUserMoodsId: moodId,
                        value: 1
                    }
                }
            });
            }
        }
    } 
    console.log('isLike --->>>', isLike);

    var params = {
      FilterExpression: 'referenceUserKey = :referenceUserKey AND cardPointUserInteractionsId = :cardPointUserInteractionsId',
      ExpressionAttributeValues: {
          ':referenceUserKey': {'S': userId},
          ':cardPointUserInteractionsId': {'S': cardId}
      },
      TableName: process.env.API_CATERGRAM3_USERINTERACTIONTABLE_NAME
    };

    let result = await dynamodb.scan(params).promise();
    let interactionID = result.Items[0] ? result.Items[0].id.S : null
    console.log('interaction id', interactionID);

    if(interactionID) {
        console.log('Updating Object')
        // NEED TO SWITCH THE CARD TO OPPOSITE
        const newRes =  await graphqlClient.mutate({
            mutation: gql(updateUserInteraction),
            variables: {
                input: {
                    id: interactionID,
                    isLiked: isLike
                }
            }
        });
        console.log('Updated Like', newRes.data.updateUserInteraction.id);
        console.log('Updated Like', newRes.data.updateUserInteraction.referenceUserKey);
    } else {
        console.log('Creating New Object')
        // NEED TO MAKE A NEW LIKE DISLIKE OBJECT
        await graphqlClient.mutate({
            mutation: gql(createUserInteraction),
            variables: {
                input: {
                    isLiked: isLike,
                    cardPointUserInteractionsId: cardId,
                    userProfileInteractionsId: userId,
                    referenceUserKey: userId,
                    owner: owner
                }
            }
        });
        // console.log('brand new Like', newRes.data.createUserInteraction)
    }
    


    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        id: cardId
    };

    return response;


};

const updateUserInteraction = /* GraphQL */ `
  mutation UpdateUserInteraction(
    $input: UpdateUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) 
  {
    updateUserInteraction(input: $input, condition: $condition) {
      id
      isLiked
      referenceUserKey
      card {
        id
        name
        description
        price
        delivery
        cardPointFile {
          key
          bucket
          region
        }
        restaurant {
          id
          name
          cuisine
          address
          city
          zip
          lat
          lng
        }
        orderOptionUrls {
          backgroundColor
          file {
              key
              bucket
              region
          }
          fontColor
          name
          url
        }
      }
    }
  }
`;

const createUserInteraction = /* GraphQL */ `
  mutation CreateUserInteraction(
    $input: CreateUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) {
    createUserInteraction(input: $input, condition: $condition) {
      id
      isLiked
      referenceUserKey
      card {
        id
        name
        description
        price
        delivery
        cardPointFile {
          key
          bucket
          region
        }
        restaurant {
          id
          name
          cuisine
          address
          city
          zip
          lat
          lng
        }
        orderOptionUrls {
          backgroundColor
          file {
              key
              bucket
              region
          }
          fontColor
          name
          url
        }
      }    
    }
  }
`;

const updateUserMood = /* GraphQL */ `
  mutation UpdateUserMood(
    $input: UpdateUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    updateUserMood(input: $input, condition: $condition) {
      id
    }
  }
`;

const createUserMood = /* GraphQL */ `
  mutation CreateUserMood(
    $input: CreateUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    createUserMood(input: $input, condition: $condition) {
      id
    }
  }
`;

const getUserMoods = /* GraphQL */ `
  query GetUserMoods($userId: ID!, $moodId: ID!) {
    listUserMoods(filter: {moodUserMoodsId: {eq: $moodId}, userProfileMoodsId: {eq: $userId}}) {
      items {
        id
        value
      }
    }
  }
`;

const getCardPoint = /* GraphQL */ `
  query GetCardPoint($id: ID!) {
    getCardPoint(id: $id) {
      id
      cardPointMoodId
    }
  }
`;


function getFromES(doc, context) {
  return new Promise((resolve, reject) => {
    var req = new AWS.HttpRequest(endpoint);
    

    req.method = 'POST';
    req.path = `/userinteraction/doc/_search`
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.headers[ 'Content-type' ] = 'application/json';
    req.body = JSON.stringify(doc.body);

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
            respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
            console.log('Response: ' + respBody);
            resolve(respBody);
        });
    }, function(err) {
        console.log('Error: ' + err);
        reject(err);
        context.fail('Lambda failed with error ' + err);
    });

  });
}

function postToES(doc, context, retries) {

  return new Promise((resolve, reject) => {
    var req = new AWS.HttpRequest(endpoint);
    req.path = `/cardpoint/doc/${doc.id}/_update`
    if(retries) {
      req.path = `/cardpoint/doc/${doc.id}/_update?retry_on_conflict=10`
    }
    req.method = 'POST';
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.headers[ 'Content-type' ] = 'application/json';
    req.body = JSON.stringify(doc.body);

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
            respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
            console.log('Response: ' + respBody);
            resolve({'success': 'ok'});
        });
    }, function(err) {
        console.log('Error: ' + err);
        reject(err);
        context.fail('Lambda failed with error ' + err);
    });

  });
}

function getCardFromES(id) {
  return new Promise((resolve, reject) => {
    var req = new AWS.HttpRequest(endpoint);
    req.method = 'GET';
    req.path = `/cardpoint/doc/${id}`
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.headers[ 'Content-type' ] = 'application/json';

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
      var respBody = '';
      httpResp.on('data', function (chunk) {
          respBody += chunk;
      });
      httpResp.on('end', function (chunk) {
          console.log('Response: ' + respBody);
          resolve(respBody);
      });
    }, function(err) {
        console.log('Error: ' + err);
        reject(err);
        context.fail('Lambda failed with error ' + err);
    });

  })
}
