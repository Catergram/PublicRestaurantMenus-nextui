import { Card, Grid, Container, Row } from "@nextui-org/react";
import CardContent from "./CardContent";

export default function Cards() {
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
    <Container>
      <Grid.Container gap={2} justify="center">
        {list.map((item, index) => (
          <Grid xs={12} sm={3} xl={10} key={index}>
            <Card css={{ bg: "$black", w: "100%" }}>
              <Card.Image
                src="https://nextui.org/images/card-example-2.jpeg"
                height={340}
                width="100%"
                alt="Card image background"
              />
              <Card.Footer
                blur
                css={{
                  position: "absolute",
                  bgBlur: "#ffffff",
                  // borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                  bottom: 0,
                  zIndex: 1,
                  background: "transparent",
                }}
              >
                <CardContent />
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Container >

  );
}
