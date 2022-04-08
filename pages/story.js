import Layout from '@components/Layout'
import { Card, Container, Grid } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const images = [
  'https://unsplash.it/230/344?id=1',
  'https://unsplash.it/230/344?id=2',
  'https://unsplash.it/230/344?id=3',
  'https://unsplash.it/230/344?id=4',
  'https://unsplash.it/230/344?id=5',
]

export default function Story() {
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
        <Grid.Container gap={2} justify="center">
          <div className="slide">
            <Link href="/">
              <div className="slide-items">
                {images.map((image, key) => (
                  <img
                    key={key}
                    src={image}
                    alt={`unsplash ${key}`}
                    className={`${key === active ? 'active' : ''}`}
                  />
                ))
                }
              </div>
            </Link>
            <nav className="slide-nav">
              <div className="slide-thumb">
                {
                  images.map((image, key) => (
                    <span
                      key={key}
                      className={`${key === active ? 'active' : ''}`}
                    />
                  ))
                }
              </div>
              <button
                className="slide-prev"
                onClick={prev}
              >
                Prev
              </button>
              <button
                onClick={next}
                className="slide-next"
              >
                Next
              </button>
            </nav>
          </div>
        </Grid.Container>
      </Container >
    </>
  )
}
