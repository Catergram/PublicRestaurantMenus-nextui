import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Grid } from '@nextui-org/react'

import Progress from '@components/Progress'
import CardContent from '@components/CardContent'
import { useMediaQuery } from '../hooks/useMediaQuery'

const images = [
  'https://unsplash.it/597/796?id=1',
  'https://unsplash.it/597/796?id=2',
  'https://unsplash.it/597/796?id=3',
  'https://unsplash.it/597/796?id=4',
  'https://unsplash.it/597/796?id=5',
]

export default function Story() {
  const router = useRouter()
  // const isMobile = useMediaQuery(650)
  const [active, setActive] = useState(0)

  const activeSlide = (index) => {
    setActive(index)
  }

  const next = () => {
    if (active < images.length - 1) {
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
    <div>
      {/* {!isMobile &&
        <div className="flex justify-end cursor-pointer" onClick={() => {
          router.push('/')
        }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
      } */}
      <Grid.Container
        gap={2}
        css={{
          '@xsMax': {
            px: 0,
          },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          md={6}
          sm={12}
          css={{
            '@xsMax': {
              p: 0,
            },
          }}
        >
          <Card
            cover
            css={{
              '@xsMax': {
                br: 0,
              },
            }}
          >
            <Card.Header
              css={{
                position: 'absolute',
              }}
            >

              {[...Array(images.length).keys()].map((key) => (
                <Progress key={key} active={key === active} />
              ))}
            </Card.Header>
            {images.map((image, key) => (
              <Card.Image
                key={key}
                width="100%"
                height={600}
                src={image}
                active={key === active}
                alt='Card image background'
                containerCss={{
                  d: key === active ? 'block' : 'none',
                  '@xsMax': {
                    br: 0,
                    minHeight: '100vh',
                  },
                }}
              />
            ))}
            <Card.Footer
              css={{
                zIndex: 1,
                position: 'absolute',
                p: '$md $lg',
                bottom: 0,
                left: 0,
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(255, 255, 255, 0) 100%)',
                '@xsMax': {
                  p: '$lg $12',
                },
              }}
            >
              <CardContent storyButton />
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  )
}
