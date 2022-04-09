import { useState } from 'react'
import { Text, Col, Row, Image, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";

import ShareModal from "./ShareModal";
import { useMediaQuery } from "./useMediaQuery";

export default function CardContent({ storyButton }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(undefined)
  const isSm = useMediaQuery(650);

  const handleClose = (e) => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Row onClick={() => {
        router.push('/story')
      }}>
        <Col className="card-text">
          <Text color="#fff" size={24}>
            Steak Dish
          </Text>
          <Text color="#fff" size={16}>
            Mcdonalds
          </Text>


          <Grid.Container gap={isSm ? 1.1 : 1.8} justify="center">
            <Row>
              <Text color="#fff" size={isSm ? 20 : 24}>
                $15
              </Text>
              {!storyButton &&
                <>
                  <Col>
                    <Grid xs sm md lg xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-1.svg" />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xs sm md lg xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-uber.svg" />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xs sm md lg xl >
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-Grubhub.svg" />
                    </Grid>
                  </Col>
                  <Col>

                    <Grid xs sm md lg xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-2.svg" />
                    </Grid>
                  </Col>
                </>
              }
            </Row>
          </Grid.Container>
        </Col>
        {!storyButton &&
          <Col className='card-image'>
            <Row justify="center" align="flex-start" gap={0} style={{ margin: "12px 0" }}>
              <Image
                src="images/share.svg"
                alt="Default Image"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              />
            </Row>
            <Row justify="center" align="flex-start" >
              <Image
                src="images/like.svg"
                alt="Default Image"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              />
            </Row>
          </Col>
        }
      </Row>

      {!!isOpen &&
        <ShareModal
          isOpen={isOpen}
          handleClose={handleClose}
        />
      }
    </>
  )
}
