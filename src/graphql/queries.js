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
                    restaurant {
                        name
                    }
                }
            }
        }
    }
`