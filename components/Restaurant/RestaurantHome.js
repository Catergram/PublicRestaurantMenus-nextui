import { Grid, Container, Row, Col } from "@nextui-org/react";
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo'

import MenuItem from "../Menu/Item";
import { useMediaQuery } from "@hooks/useMediaQuery"
import {useSelector} from "react-redux";

export default function RestaurantHome() {
  const router = useRouter()
  const { id } = router.query

  const isSm = useMediaQuery(650)
  const restaurant = useSelector((state) => state.restaurant.data);

  return (
    <>
      <NextSeo
        title={restaurant.name}
        description={restaurant.description}
      />
      <Container responsive css={{ marginTop: '4.5rem', marginBottom: '4rem' }}>
        <Row>
          <div>
            <Col span={isSm ? 12 : 6} >
              <p className='text-center' >{restaurant.name}</p>
              <p className='text-center'>{restaurant.address} {restaurant.city}, {restaurant.zip}</p >
              <p className='text-center '>Phone: (213) 746-0525</p>
            </Col>
            <Col span={isSm ? 12 : 5} className='flex justify-center items-center h-24'>
              <button
                type="button"
                className="w-full flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  router.push(`/restaurant/${id}/about-us`)
                }}
              >
                ABOUT US
              </button>
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
