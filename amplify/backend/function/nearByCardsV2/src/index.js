/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_ARN
	API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_NAME
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const httpAwsEs = require('http-aws-es');
const elasticsearch = require('elasticsearch');
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});


exports.handler = async (event) => {

    console.log('arguments', JSON.stringify(event.arguments));

    // const scoreObject = await getScore();
    // console.log('====++++', scoreObject);
    
    const {
      userId, 
      location,
      m, 
      delivery, 
      cuisine, 
      priceLow, 
      priceHigh,
      diets,
      limit,
      nextToken,
    } = event.arguments;
    
    // const scoreLoad = JSON.parse(payload);
    
    const { lat, lon } = location;

    console.log(process.env.API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_NAME)
    
    var params = {
        FilterExpression: 'userID = :userID',
        ExpressionAttributeValues: {
            ':userID': {'S': userId},
        },
        TableName: process.env.API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_NAME
    };
    
    let dynamoResult;
    if(userId) {
        dynamoResult = await dynamodb.scan(params).promise();
    }  
      
    let friendsRed = [];

    console.log(dynamoResult)
      
    if(userId && dynamoResult.Items.length > 0) {
        dynamoResult.Items.forEach((frnd) => {
            friendsRed.push(frnd.userID.S);
        })
    }

        console.log('---->>>> FriendArray', friendsRed.toString());

    let scoreLoad = {
        likedByMe: 0.50,
        dislikedByMe: 0.01,
        mealScore: 1,
        selectedMealType: 'Dynamic',
        shareNumber: 1,
        shareScore: 1,
        likedByFriends: 1,
        dislikedByFriends: 1,

    }
    
    let myLikedBeforeScore = scoreLoad.likedByMe;
    let myDislikedBeforeScore = scoreLoad.dislikedByMe;
    
    let mealScore = scoreLoad.mealScore ? scoreLoad.mealScore : 1;
    let mealName = scoreLoad.selectedMealType ? scoreLoad.selectedMealType : '';
    
    let shareNumber = scoreLoad.shareNumber ? Number(scoreLoad.shareNumber) : 1;
    let shareScore = scoreLoad.shareScore ? Number(scoreLoad.shareScore) : 1;
    
    const client = new elasticsearch.Client({
      host: process.env.ES_ENDPOINT,
      connectionClass: httpAwsEs,
      amazonES: {
        region: process.env.REGION
      }
    });
    
    const queryBody = {
        "query": {
            "function_score": {
                "boost": "3",
                "score_mode": "sum",
                "query": {
                    "bool": {
                        "must": [
                            cuisineFilter(cuisine)
                        ],
                        "must_not": [
                          {
                            "match": {
                              "id": filterVisitedNodes(nextToken)
                            }
                          }
                        ],
                        "filter": [
                            locationFilter(lat, lon, m),
                            deliveryFilter(delivery),
                            priceFilter(priceLow, priceHigh),
                            dietsFilter(diets)
                        ]
                    }
                },
                "functions": [
                    {
                        "random_score": {}
                    },
                    {
                        "filter": {
                            "match": {
                                "dislike": userId
                            }
                        },
                        "weight": myLikedBeforeScore
                    },
                    {
                        "filter": {
                            "match": {
                                "like": userId
                            }
                        },
                        "weight": myDislikedBeforeScore
                    },
                    {
                        "filter": {
                            "match": {
                                "mealType": mealName
                            }
                        },
                        "weight": mealScore
                    },
                    ...applyFriendsFilter(friendsRed, scoreLoad.likedByFriends),
                    ...applyFriendsDislikeFilter(friendsRed, scoreLoad.dislikedByFriends),
                    locationFilterScore(lat, lon, m, scoreLoad.distanceWeight),
                    {
                        "filter": {
                            "range": {
                                "totalShares": {
                                    "gte": shareNumber,
                                    "lte": 9999
                                }
                            }
                        },
                        "weight": shareScore
                    },
                ]
            }
        },
        "sort": [
            {
                "_score": {
                    "order": "desc"
                }
            },
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
    };

    if(nextToken) {
        queryBody.search_after = getSearchAfterValue(nextToken)
    }

    const result = await client.search({
        index: 'cardpoint',
        explain: true,
        size: limit ? limit : 20,
        body: queryBody
    });
    
    console.log('-result-->>>>', JSON.stringify(result));
    console.log('--->>>>', JSON.stringify(result.hits.total));

    const items = [];
    const relevance = {};
    let batch = [];
    if(nextToken) {
      let items = nextToken.split("\|")[2];
      if(items) {
        const prevItems = items.split(',');
        console.log('====>>ITEMS>>>>', prevItems)
        if(prevItems.length < 100) {
          batch = [...prevItems];
        }
      }
    }
    
    console.log('WHATS THE BATCH', batch);
    result.hits.hits.forEach((o) => {
      items.push({
        id: o._id,
       ...o._source
      });
      batch.push(o._id);
      relevance[o._id] = {score: o._score, explanation: o._explanation}
    });
    
    let nextNextToken = null;
    
    if(result.hits.hits[result.hits.hits.length - 1] && result.hits.hits[result.hits.hits.length - 1].sort) {
      nextNextToken = result.hits.hits[result.hits.hits.length - 1].sort.join('|');
      nextNextToken = `${nextNextToken}|${batch}`
    }

    if(items.length === 0) {
      nextNextToken = null;
    }
    
    const response = {
      items,
      total: items.length,
      nextToken: nextNextToken,
      info: JSON.stringify(relevance),
    };
    
    return response;
};

function getSearchAfterValue(token) {
    return [ token.split("\|")[0], token.split("\|")[1] ]
}

function applyFriendsDislikeFilter(friendsRed, score) {
  if(friendsRed.length > 0 && score) {
    score = score * 0.01;
    let total = [];
    friendsRed.forEach(ff => {
      total.push({
        "filter": {
          "match": {
            "dislike": ff.toString()
          }
        },
        "weight": score 
      })
    })
    return total;
  } else {
    return [{
      "filter": {
        "match": {
          "dislike": ""
        }
      },
      "weight": 0.00001
    }];
  }
}

function applyFriendsFilter(friendsRed, score) {
  console.log('All My Friends', friendsRed);
  console.log('Score -->', score);
  if(friendsRed.length > 0 && score) {
    let total = [];
    friendsRed.forEach(ff => {
      total.push({
        "filter": {
          "match": {
            "like": ff.toString()
          }
        },
        "weight": score
      })
    })
    return total;
  } else {
    return [{
      "filter": {
        "match": {
          "like": ""
        }
      },
      "weight": 0.00001
    }];
  }
}

function dietsFilter(diets) {
  if(!diets) {
    return {
      "match_all": {}
    }
  }
  return {
    "match": {
      "diets": diets
    }
  };
}

function priceFilter(priceLow, priceHigh) {
  return {
    "range": {
      "price": {
        "gte": priceLow ? priceLow : 0,
        "lte": priceHigh ? priceHigh : 999
      }
    }
  };
}

function deliveryFilter(delivery) {
  if(!delivery) {
    return {
      "match_all": {}
    }
  }
  return {
    "match": {
      "delivery": delivery
    }
  };
}

function cuisineFilter(cuisine) {
    if(!cuisine) {
        return {
          "match_all": {}
        };
    }
    return {
        "match": {
            "cuisine": "French"
        }
    };
}

function locationFilter(lat, lon, m) {
    let rad = 100;
    if(m) {
      rad = m;
    }
    return {
        "geo_distance": {
            "distance": rad + "miles",
            "distance_type": "arc",
            "location": {
                "lat": lat,
                "lon": lon
            }
        }
    };
}

function locationFilterScore(lat, lon, m, score) {
    let rad = 100;
    if(m) {
      rad = m;
    }
    return {
      "filter": {
        "geo_distance": {
            "distance": rad + "miles",
            "distance_type": "arc",
            "location": {
                "lat": lat,
                "lon": lon
            }
        }
      },
      "weight": score ? score : 1
    }
}

function filterVisitedNodes(token) {
  if(!token) {
    return ""
  }
  console.log('===>>> SHOW MEEE TOKEN', token.split("\|")[2]);
  return token.split("\|")[2];
}