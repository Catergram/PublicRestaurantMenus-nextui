import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Card, Col, Container, Grid } from '@nextui-org/react';

import CardContent from "@components/CardContent";
import { useMediaQuery } from '@components/useMediaQuery';

const images = [
  'https://unsplash.it/597/796?id=1',
  'https://unsplash.it/597/796?id=2',
  'https://unsplash.it/597/796?id=3',
  'https://unsplash.it/597/796?id=4',
  'https://unsplash.it/597/796?id=5',
]

export default function Story() {
  const router = useRouter()
  const isMobile = useMediaQuery(650);
  const isTablet = useMediaQuery(1200);
  const isDesktop = useMediaQuery(1800);

  const [active, setActive] = useState(0)

  const activeSlide = (index) => {
    setActive(index)
  }

  const next = () => {
    if (active < images.length - 1) {
      activeSlide(active + 1);
    } else {
      activeSlide(0);
    }
  }

  useEffect(() => {
    let timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <>
      {!isMobile &&
        <div className="flex justify-end cursor-pointer" onClick={() => {
          router.push('/')
        }}>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
      }
      <Grid.Container gap={2} justify="center" className='p-0 border-0 p-0 m-0 w-full'>
        <Grid md={6} sm={12} justify="center" className="p-0"
          css={{
            height: isMobile ? '100vh' : '100vh'
          }}
        >

          <Col css={isMobile ? {} : {
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isTablet ? '0 18rem' : isDesktop ? '0 10rem' : '0 10rem'
          }}>
            <Card
              css={
                isMobile ? { height: '100vh', borderRadius: 0 }
                  :
                  { height: 500 }
              }
              cover
              className="p-0 border-0"
            >

              <Card.Header css={{ position: "absolute", zIndex: 1, top: 0 }}>
                <Col className="w-full">

                  <div className="slide-thumb w-full">
                    <span />
                    {
                      images.map((image, key) => (
                        <span
                          key={key}
                          className={`${key === active ? 'active' : ''}`}
                        />
                      ))
                    }
                  </div>
                  {isMobile &&
                    <div className="flex justify-end cursor-pointer" onClick={() => {
                      router.push('/')
                    }}>
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                  }
                </Col>
              </Card.Header>
              <Card.Image
                css={
                  isMobile ? { height: '100vh', borderRadius: 0 } :
                    { height: '100%' }}
                className={`border-0 h-full ${isMobile ? 'rounded-none' : ''}`}
                src={images[active]}
                width="100%"
                alt="Card image background"
              />
              <Card.Footer css={{ position: "absolute", zIndex: 1, bottom: 5 }}>
                <Col>
                  <CardContent storyButton={true} />
                </Col>
              </Card.Footer>
            </Card>
          </Col>
        </Grid>
      </Grid.Container>
    </>
  )
}
