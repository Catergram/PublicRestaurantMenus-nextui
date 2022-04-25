import { Grid, Container, Row, Col, Button } from "@nextui-org/react";
import { useRouter } from "next/router"
import { NextSeo } from 'next-seo'

import MenuItem from "../Menu/Item";
import { useMediaQuery } from "@hooks/useMediaQuery"

export default function RestaurantHome({restaurant={restaurant}}) {
  const router = useRouter()
  const { id } = router.query

  const isSm = useMediaQuery(650)

  return (
    <>
      <NextSeo
        title={restaurant.name}
        description={restaurant.description}
      />
      <Container responsive css={{ marginTop: '4.5rem', marginBottom: '4rem' }}>
        <Row>
          <div>
            <Col span={isSm ? 12 : 6} css={{
              marginTop: 10
            }} >
              <p className='text-center m-0' >{restaurant.name}</p>
              <p className='text-center m-0'>{restaurant.address} {restaurant.city}, {restaurant.zip}</p >
              <p className='text-center m-0'>Phone: (213) 746-0525</p>
            </Col>
            <Col span={isSm ? 12 : 5} className='flex justify-center items-center h-24'>
              <Button
                color='#dc2626'
                className="w-full flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  router.push(`/restaurant/${id}/about-us`)
                }}
                css={{
                  backgroundColor: 'rgb(220, 38, 38)',
                  color: '#fff',
                  mt: 20
                }}
                auto
              >
                ABOUT US
              </Button>
            </Col>
          </div>
        </Row>
        <Grid.Container gap={2} justify="center" >
          {
            restaurant.cards && restaurant.cards.items ? restaurant.cards.items.map((item) => (
              <MenuItem {...item} key={item.id} />
            )) : null
          }
        </Grid.Container >
      </Container >
    </>
  );
}
