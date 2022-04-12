import { useEffect, useState } from "react";
import { Card, Grid } from "@nextui-org/react";
import Progress from "../components/Progress";
import CardContent from "../components/CardContent";

const images = [
  "https://dgh3t0irkf4qk.cloudfront.net/public/3ecbc810-0225-479e-9431-d80678da3c451648154823455",
  "https://dgh3t0irkf4qk.cloudfront.net/public/81445abb-d2bf-49d3-ab1b-5916296b26571648154823454"
  // "https://unsplash.it/567/500?id=3",
  // "https://unsplash.it/567/500?id=4",
  // "https://unsplash.it/567/500?id=5"
];

export default function Story() {
  const [active, setActive] = useState(0);

  const activeSlide = (index) => {
    setActive(index);
  };

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
    <Grid.Container
      // gap={2}
      css={{
        "@xsMax": {
          px: 0
        },
        width: "100%",
        height: "600",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'stretch'
      }}
    >
      <Grid
        md={6}
        sm={12}
        css={{
          "@xsMax": {
            p: 0
          }
        }}
      >
        <Card
          cover
          css={{
            "@xsMax": {
              br: 0
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
          {images.map((image, key) => (
            <Card.Image
              key={key}
              width="100%"
              height={600}
              src={image}
              active={key === active}
              alt="Card image background"
              containerCss={{
                d: key === active ? "block" : "none",
                "@xsMax": {
                  br: 0,
                  minHeight: "100vh"
                }
              }}
            />
          ))}
          <Card.Footer
            css={{
              zIndex: 1,
              position: "absolute",
              p: "$md $lg",
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(255, 255, 255, 0) 100%)",
              "@xsMax": {
                p: "$lg $12"
              }
            }}
          >
            <CardContent storyButton />
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
