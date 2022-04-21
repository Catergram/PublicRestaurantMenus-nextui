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
        index: 'restaurant',
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
            },
            
          }
        }
    };
    let payload = {
        index: 'restaurant',
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
          }
        }
    };
    
    if(nextScore) {
        payloadA.body.search_after = [nextScore];
    }
    if(limit) {
        payloadA.body.size = limit;
    }
    
    let result = await client.search(payloadA);

    console.log('--->>>>', JSON.stringify(result));
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
    let nextToken = null;

    if(result.hits.hits) {
        result.hits.hits.forEach(i => {
            console.log('SHOW ITEM', JSON.stringify(i));
            const { 
                id,
                name,
                address,
                city,
                zip,
                file,
                description,
                lat,
                lng,
                cards,
                cuisine,
                delivery,
                contact
            } = i._source;
            items.push({
                id,
                name,
                address,
                city,
                zip,
                file,
                description,
                lat,
                lng,
                cards,
                cuisine,
                delivery,
                contact
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
        items,
        nextToken,
        total: items.length
    };
    return response;
};
