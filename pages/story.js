import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card, Grid, Button, Image, Text, Col } from "@nextui-org/react"

import Progress from "@components/Progress"
import CardContent from "@components/CardContent"
import { useMediaQuery } from "@hooks/useMediaQuery"

const images = [
  {
    image: "https://dgh3t0irkf4qk.cloudfront.net/public/81445abb-d2bf-49d3-ab1b-5916296b26571648154823454",
    text: "Who runs  the world?",
    align: "TOP",
  },
  {
    image: "https://dgh3t0irkf4qk.cloudfront.net/public/3ecbc810-0225-479e-9431-d80678da3c451648154823455",
    text: "Madonna",
    align: "CENTER",
  },
  {
    image: "https://unsplash.it/1920/1200?id=3",
    text: "Hello",
    align: "BOTTOM",
  },
  {
    image: "https://unsplash.it/1920/1200?id=4",
    text: "abc",
    align: "TOP",
  },
  {
    image: "https://unsplash.it/1920/1200?id=5",
    text: "abc",
    align: "TOP",
  },
]

export default function Story() {
  const router = useRouter()
  const [active, setActive] = useState(0);
  const isMobile = useMediaQuery(650)
  const isTablet = useMediaQuery(878)

  const activeSlide = (index) => {
    setActive(index);
  };

  const prev = () => {
    if (active > 0) {
      activeSlide(active - 1)
    } else {
      activeSlide(images.length - 1)
    }
  }

  const next = () => {
    if (active < images.length - 1) {
      activeSlide(active + 1);
    } else {
      activeSlide(0);
    }
  };

  useEffect(() => {
    let timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <>
      <Col
        css={{
          backgroundImage: `url(${images[active].image})`,
          backgroundSize: "3000%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          position: "fixed",
          height: "100vh",
          width: "100%",
          "@xsMax": {
            height: "60vh"
          }
        }}
      >
        <Col
          css={{
            backdropFilter: `blur(20px)`,
            height: "100vh",
            "@xsMax": {
              height: "60vh"
            }
          }}
        />
      </Col>
      <Button
        auto
        color="error"
        icon={<Image
          src="/images/close_circled_icon.svg"
          alt="Default Image"
          width={30}
          height={30}
          css={{
              filter: 'invert(100%)'
          }}
        />}
        css={{
          position: "fixed",
          left: "10px",
          top: isMobile ? "35px" : "10px",
          zIndex: "999",
        }}
        onClick={() => {
          router.push("/")
        }}
      />
      <Grid.Container
        gap={2}
        justify="center"
        css={{
          overflow: "hidden",
          width: "100%",
          height: "100vh",
          padding: "$0",
          margin: "$0",
          "@xsMax": {
            px: 0
          }
        }}
      >
        <Grid
          css={{
            opacity: "1",
            p: "0",
            maxHeight: "fit-content",
            "@initial": {
              maxW: "460px",
            },
            "@xsMax": {
              height: "100vh",
              maxW: "100%",
              p: 0
            }
          }}
        >
          <Card
            cover
            css={{
              position: "relative",
              overflow: "visible",
              top: "10%",
              height: "70%",
              border: "none",
              "initial": {
                height: "100%",
                top: "100px",
              },
              "@xsMax": {
                br: 0,
                height: "100%",
                top: "0px",
              }
            }}
          >

            <Card.Header
              css={{
                position: "absolute"
              }}
            >
              {[...Array(images.length).keys()].map((key) => (
                <Progress key={key} active={key === active} />
              ))}
            </Card.Header>
            <Card.Body>
              {images.map((image, key) => (
                <Card.Image
                  key={key}
                  width="100%"
                  height="100%"
                  src={image.image}
                  autoResize={true}
                  active={`${key === active}`}
                  alt="Card image background"
                  containerCss={{
                    d: key === active ? "block" : "none",
                    height: "100%",
                    width: "100%",
                    maxHeight: "100vh",
                    aspectRatio: 1 / 2,
                    "@xsMax": {
                      br: 0,
                      height: "60vh",
                      width: "100vh"
                    }
                  }}
                  css={{
                    height: "70%!important",
                    "@xsMax": {
                      height: "60vh!important",
                      width: "100vh"
                    }
                  }}
                />
              ))}

              <Text
                css={{
                  position: "absolute",
                  top: images[active].align === "TOP" ? "10%" : images[active].align === "BOTTOM" ? "50%" : "30%",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "50px",
                  color: "#fff"
                }}
              >{images[active].text}</Text>
            </Card.Body>
            <Button
              auto
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="m21.52 16.22 7.75 7.75m-7.75 7.78L29.27 24" /></svg>
              }
              css={{
                padding: "0!important",
                backgroundRepeat: "no-repeat !important",
                filter: "none!important",
                backgroundColor: "#fff!important",
                borderRadius: "50%!important",
                transform: "rotate(180deg)!important",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                top: "50%",
                left: isMobile ? "1rem" : "-5rem",
                height: "48px",
                width: "48px",
                "@xsMax": {
                  top: "30%",
                }
              }}
              onClick={prev}
            />
            <Button
              auto
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none"><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="m21.52 16.22 7.75 7.75m-7.75 7.78L29.27 24" /></svg>
              }
              css={{
                padding: "0!important",
                backgroundRepeat: "no-repeat !important",
                filter: "none!important",
                backgroundColor: "#fff!important",
                borderRadius: "50%!important",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                top: "50%",
                right: isMobile ? "1rem" : "-5rem",
                height: "48px",
                width: "48px",
                "@xsMax": {
                  top: "30%",
                }
              }}
              onClick={next}
            />
            <Card.Footer
              css={{
                zIndex: 1,
                position: "absolute",
                p: "$md $lg",
                bottom: 0,
                left: 0,
                background: "#fff",
                marginBottom: "135px",
                "@xsMax": {
                  borderRadius: "0px",
                  p: "$lg $12",
                  marginBottom: "160px",
                  background: "#fff",
                }
              }}
            >
              <CardContent storyButton textColorBlack />
            </Card.Footer>
            <Col css={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginBottom: '40px'
            }}>
              <Button
                auto
                type="button"
                css={{
                  color: '#fff !important',
                  backgroundColor: "#020202 !important",
                  width: '40%',
                  height: "50px",
                  fontSize: "24px",
                  "@xsMax": {
                    color: '#fff !important',
                    backgroundColor: "#020202 !important",
                    width: '40%'
                  }
                }}
              >
                Uber Eats
              </Button>
              <Button
                auto
                type="button"
                css={{
                  color: '#fff !important',
                  backgroundColor: "#e14747 !important",
                  width: '40%',
                  height: "50px",
                  fontSize: "24px",
                  "@xsMax": {
                    color: '#fff !important',
                    backgroundColor: "#e14747 !important",
                    width: '40%'
                  }
                }}
              >
                Grubhub
              </Button>
            </Col>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
