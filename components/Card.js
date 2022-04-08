import { Card, Grid, Container, Row, Col, Link, Button, } from "@nextui-org/react";
import { useState } from "react";
import CardContent from "./CardContent";
import { useMediaQuery } from "./useMediaQuery";

const images = [
  'https://unsplash.it/230/344?id=1',
  'https://unsplash.it/230/344?id=2',
  'https://unsplash.it/230/344?id=3',
  'https://unsplash.it/230/344?id=4',
  'https://unsplash.it/230/344?id=5',
]

export default function Cards() {
  const isSm = useMediaQuery(650);
  const [isOpen, SetIsOpen] = useState(undefined)
  const [active, setActive] = useState(0)

  const prev = () => {
    if (active > 0) {
      activeSlide(active - 1);
    } else {
      activeSlide(images.length - 1);
    }
  }

  const next = () => {
    if (active < images.length - 1) {
      activeSlide(active + 1);
    } else {
      activeSlide(0);
    }
  }
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Advocato",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <>
      <Container responsive >
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
            list.map((item, index) => (
              <Grid xs={12} sm={4} xl={4} md={3} key={index} >
                <Card css={{ bg: "$black", w: "100%" }}>
                  <Link href="/story">
                    <Card.Image
                      src="https://nextui.org/images/card-example-2.jpeg"
                      height={340}
                      width="100%"
                      alt="Card image background"
                    />
                  </Link>
                  <Card.Footer blur
                    css={{
                      position: "absolute",
                      bgBlur: "#ffffff",
                      bottom: 0,
                      zIndex: 1,
                      background: "transparent",
                    }}
                  >
                    <CardContent />
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
