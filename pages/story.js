import CardContent from '@components/CardContent';
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
      <Container responsive className='h-screen w-full image-block'>
        <Grid.Container gap={2} justify="center" className='image-grid m-auto block w-4/5 absolute top-2/4 left-2/4'>
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
              <CardContent />
            </nav>
          </div>
        </Grid.Container>
      </Container >
    </>
  )
}
