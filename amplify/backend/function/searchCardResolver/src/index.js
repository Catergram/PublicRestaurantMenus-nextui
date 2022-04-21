/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const httpAwsEs = require('http-aws-es');
const elasticsearch = require('elasticsearch');

exports.handler = async (event) => {
    
    const client = new elasticsearch.Client({
        host: process.env.ES_ENDPOINT,
        connectionClass: httpAwsEs,
        amazonES: {
            region: process.env.REGION,
            credentials: new AWS.EnvironmentCredentials('AWS')
        }
    });

    const name = event.arguments.name;
    const nextScore = event.arguments.nextToken;
    const limit = event.arguments.limit;
    let isWildcard = false;
    
    let payloadA = {
        index: 'cardpoint',
        body: {
          query: {
            bool: {
                must: [
                    {
                        match: {
                            name: name
                        }
                    }
                ]
            }
          },
          sort: [
                {
                    "updatedAt": {
                        "order": "desc"    
                    }
                }
            ]
        }
    };
    let payload = {
        index: 'cardpoint',
        body: {
          query: {
            bool: {
                must: [
                    {
                        wildcard: {
                            name: {
                              value: `*${name}*`
                            }
                        }
                    }
                ]
            }
          },
          sort: [
            {
                "updatedAt": {
                    "order": "desc"    
                }
            }
        ]
        }
    };
    if(nextScore) {
        payloadA.body.search_after = [nextScore];
    }
    if(limit) {
        payloadA.body.size = limit;
    }
    let result = await client.search(payloadA);
    
    
    if(result.hits.hits.length === 0) {
        // Do Wildcard Search
        isWildcard = true;
        if(nextScore) {
            payload.body.search_after = [nextScore];
        }
        if(limit) {
            payload.body.size = limit;
        }
        result = await client.search(payload);
    }
    
    const items = [];
    
    console.log('--->>>>>', JSON.stringify(result));
    let nextToken = null;
    
    if(result.hits.hits) {
        result.hits.hits.forEach(i => {
            const { 
                id, 
                name, 
                location, 
                price, 
                zip, 
                city, 
                orderOptionUrls, 
                cardPointFile,
                diets,
                restaurantID,
                cardPointMoodId,
                description,
                menus,
                cuisine,
                delivery
                
            } = i._source;
            items.push({
                id, 
                name, 
                location, 
                price, 
                zip, 
                city, 
                orderOptionUrls, 
                cardPointFile,
                diets,
                restaurantID,
                cardPointMoodId,
                description,
                cuisine,
                menus,
                delivery
            });
        });
        if(result.hits.hits.length > 0 && result.hits.hits[result.hits.hits.length - 1].sort) {
            nextToken = result.hits.hits[result.hits.hits.length - 1].sort[0];
            
            // Grab Next Next Token
            let resultNext;
            if(nextToken) {
                if(isWildcard) {
                    payload.body.search_after = [nextToken];
                    resultNext = await client.search(payload);
                } else {
                    payloadA.body.search_after = [nextToken];
                    resultNext = await client.search(payloadA);
                }
                console.log('-----<<>>>------', JSON.stringify(resultNext.hits.hits.length));
                if(!resultNext.hits.hits || resultNext.hits.hits.length === 0) {
                    nextToken = null;
                }
            }
        }
    }
    

    const response = {
        statusCode: 200,
        items: items,
        nextToken,
        total: items.length
    };
    return response;
};
