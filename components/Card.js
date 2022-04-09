import { Card, Grid, Container, Row, Col } from "@nextui-org/react";
import { useRouter } from "next/router";

import CardContent from "./CardContent";
import { useMediaQuery } from "./useMediaQuery";

const images = [
  'https://unsplash.it/597/796?id=1',
  'https://unsplash.it/230/344?id=2',
  'https://unsplash.it/230/344?id=3',
  'https://unsplash.it/230/344?id=4',
  'https://unsplash.it/230/344?id=5',
  'https://unsplash.it/230/344?id=6',
  'https://unsplash.it/230/344?id=7',
  'https://unsplash.it/230/344?id=8',

]

export default function Cards() {
  const router = useRouter()
  const isSm = useMediaQuery(650)

  return (
    <>
      <Container responsive css={{ marginTop: '4.5rem' }}>
        <Row>
          <div>
            <Col span={isSm ? 12 : 5} >
              <p className='text-center' >Mcdonlds</p>
              <p className='text-center'>201 W Washington Blvd Los Angeles, CA 90007</p >
              <p className='text-center '>Phone: (213) 746-0525</p>
            </Col>
            <Col span={isSm ? 12 : 5} className='flex justify-center items-center h-24'>
              <button
                type="button"
                className="w-full flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setOpen(false)}
              >
                ABOUT US
              </button>
            </Col>
          </div>
        </Row>
        <Grid.Container gap={2} justify="center" >
          {
            images.map((image, index) => (
              <Grid xs={12} sm={4} xl={4} md={3} key={index} >
                <Card cover onClick={() => router.push('/story')}>
                  <Card.Image
                    src={image}
                    height={340}
                    width="100%"
                    alt="Card image background"
                  />
                  <Card.Footer css={{ position: "absolute", zIndex: 1, bottom: 5 }}>
                    <Col>
                      <CardContent />
                    </Col>
                  </Card.Footer>
                </Card>
              </Grid>
            ))
          }
        </Grid.Container >
      </Container >
    </>
  );
}
