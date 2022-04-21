/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
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
    
    const lat = event.arguments.location.lat;
    const lon = event.arguments.location.lon;
    const m = event.arguments.m;
    
    const result = await client.search({
      index: 'userprofile',
      body: {
        size: 1000,
        query: {
         bool: {
             filter: [
                {
                    geo_distance: {
                      distance: m + "miles",
                      distance_type: "arc",
                      loc: {
                        lat: lat,
                        lon: lon
                      }
                    }
                }
             ]
         }
        }
      }
    });
    
    console.log(result);
    
    const items = [];
    
    if(result.hits.hits) {
        result.hits.hits.forEach(i => {
            console.log('SHOW ITEM', JSON.stringify(i));
            items.push({
                id: i._source['id'],
                uid: i._source['uid'],
                email: i._source['email'],
                firstname: i._source['firstname'],
                lastname: i._source['lastname'],
                createdAt: i._source['createdAt'],
                updatedAt: i._source['updatedAt'],
                iosDeviceId: i._source['iosDeviceId'],
                notifications: i._source['notifications']
            });
        });
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        items
    };
    return response;
};


