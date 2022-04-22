export const getRestaurant = /* GraphQL */ `
    query getRestaurant($id: ID!) {
        getRestaurant(id: $id) {
            address
            city
            averagePrice
            cuisine
            description
            menus {
                name
            }
            file {
                bucket
                key
                region
            }
            orderOptionUrls {
                backgroundColor
                fontColor
                name
                url
                file {
                    bucket
                    key
                    region
                }
            }
            name
            zip
            cards {
                count
                items {
                    city
                    description
                    id
                    price
                    cardPointFile {
                        bucket
                        key
                        region
                    }
                    restaurant {
                        name
                    }
                    cuisine
                    delivery
                    diets
                    menus {
                        name
                    }
                    mood {
                        name
                        backgroundColor
                        createdAt
                        file {
                            bucket
                            key
                            region
                        }
                    }
                    ratingScore
                    createdAt
                    location {
                        lat
                        lon
                    }
                    name
                }
            }
        }
    }
`