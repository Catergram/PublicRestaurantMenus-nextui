const AWS = require('aws-sdk');
const httpAwsEs = require('http-aws-es');
const elasticsearch = require('elasticsearch');

exports.handler = async (event) => {
    const items = []
    console.log(event);
    
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
    const size = event.arguments.limit;
    
    
    const result = await client.search({
      index: 'restaurant',
      body: {
        size: size,
        query: {
         bool: {
             filter: [
                {
                    geo_distance: {
                      distance: m + "miles",
                      distance_type: "arc",
                      location: {
                        lat: lat,
                        lon: lon
                      }
                    }
                }
             ]
         }
        },
        sort: [
            {
                "_geo_distance": {
                    "location": {
                        lat: lat,
                        lon: lon
                    },
                    "order": "asc",
                    "unit": "miles",
                    "distance_type": "arc"
                }
            }
        ]
      }
    });
    
    console.log(result);
    
    if(result.hits.hits) {
        result.hits.hits.forEach(i => {
            console.log('SHOW ITEM', JSON.stringify(i));
            items.push({
                id: i._source['id'],
                name: i._source['name'],
                address: i._source['address'],
                city: i._source['city'],
                zip: i._source['zip'],
                file: i._source['file'],
                description:  i._source['description'],
                location: i._source['location'],
                cuisine:  i._source['cuisine'],
                delivery:  i._source['delivery'],
                orderOptionUrls: i._source['orderOptionUrls'],
                contact: i._source['contact']
            });
        });
    }
    
    let nextToken = null;
    
    if(result.hits.hits[result.hits.hits.length - 1]) {
      nextToken = result.hits.hits[result.hits.hits.length - 1].sort[0];
    }
    console.log(items);
    let response = {
        statusCode: 200,
        body: 
        items,
        nextToken
    };
    response = {
      items,
      total: items.length,
      nextToken: nextToken,
    };
    return response;
    
};
