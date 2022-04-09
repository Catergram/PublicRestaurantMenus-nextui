import { Card, Grid, Container, Row, Col, Link, Button, } from "@nextui-org/react";
import { useState, useEffect } from "react";
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

  const activeSlide = (index) => {
    setActive(index)
  }


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

  useEffect(() => {
    let timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [active]);

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
      <style jsx global>
        {
          `
        img {
          max-width: 100%;
          display: block;
        }
        .slide {
          width: 230px;
          margin: 20px auto;
          display: grid;
          box-shadow: 0 4px 20px 2px rgba(0, 0, 0, 0.4);
        }
        .slide-items {
          position: relative;
          grid-area: 1/1;
          border-radius: 5px;
          overflow: hidden;
        }
        .slide-nav {
          grid-area: 1/1;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          grid-template-rows: auto 1fr;
          display:flex;
          justify-content: center;
        }
        .slide-nav button {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          opacity: 0;
          width: 10px;
        }
        .slide-items > * {
          position: absolute;
          top: 0px;
          opacity: 0;
          pointer-events: none;
        }
        .slide-items > .active {
          position: relative;
          opacity: 1;
          pointer-events: initial;
        }
        .slide-thumb {
          display: flex;
          grid-column: 1 / 3;
        }
        .slide-thumb > span {
          flex: 1;
          display: block;
          height: 3px;
          background: rgba(0, 0, 0, 0.4);
          margin: 5px;
          border-radius: 3px;
          overflow: hidden;
        }
        .slide-thumb > span.active::after {
          content: '';
          display: block;
          height: inherit;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 3px;
          transform: translateX(-100%);
          animation: thumb 5s forwards linear;
        }
        .slide-next{
          margin-left: 5rem;
        }
        @keyframes thumb {
          to {
            transform: initial;
          }
        }
      `
        }
      </style>
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
