import { useEffect, useState } from 'react'
import { Card, Grid, Container, Row, Col } from "@nextui-org/react";
import { useRouter } from "next/router";

import CardContent from "./CardContent";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Progress from './Progress'

const images = [
  'https://unsplash.it/230/344?id=1',
  'https://unsplash.it/230/344?id=2',
  'https://unsplash.it/230/344?id=3',
  'https://unsplash.it/230/344?id=4',
  'https://unsplash.it/230/344?id=5',
  'https://unsplash.it/230/344?id=6',
  'https://unsplash.it/230/344?id=7',
  'https://unsplash.it/230/344?id=8',
]

const images2 = [
  'https://unsplash.it/230/344?id=1',
  'https://unsplash.it/230/344?id=2',
  'https://unsplash.it/230/344?id=3',
  'https://unsplash.it/230/344?id=4',
  'https://unsplash.it/230/344?id=5',
]

export default function Cards() {
  const router = useRouter()
  const isSm = useMediaQuery(650)
  const [active, setActive] = useState(0)

  const activeSlide = (index) => {
    setActive(index)
  }

  const next = () => {
    if (active < images2.length - 1) {
      activeSlide(active + 1)
    } else {
      activeSlide(0)
    }
  }

  useEffect(() => {
    let timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [active])

  return (
    <>
      <Container responsive css={{ marginTop: '4.5rem', marginBottom: '4rem' }}>
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
                onClick={() => {
                  router.push('/aboutus-story')
                }}
              >
                ABOUT US
              </button>
            </Col>
          </div>
        </Row>
        <Grid.Container gap={2} justify="center" >
          {
            images.map((image, index) => (
              <Grid xs={12} sm={4} xl={3} md={3} key={index}>
                <Card cover css={{ border: 'none' }}>
                  <Card.Header
                    css={{
                      position: 'absolute',
                    }}
                  >
                    {[...Array(images2.length).keys()].map((key) => (
                      <Progress key={key} active={key === active} />
                    ))}
                  </Card.Header>
                  {images2.map((image, key) => (
                    <Card.Image
                      key={key}
                      width="100%"
                      height="100%"
                      // height={340}
                      src={image}
                      autoResize={false}
                      active={`${key === active}`}
                      className="cursor-pointer"
                      alt="Card image background"
                      containerCss={{
                        d: key === active ? 'block' : 'none',
                        height: "100%",
                        maxHeight: "100vh",
                        '@xsMax': {
                          br: 0,
                          minHeight: '40vh',
                        },
                      }}
                      onClick={() => {
                        router.push('/story')
                      }}
                    />
                  ))}
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
