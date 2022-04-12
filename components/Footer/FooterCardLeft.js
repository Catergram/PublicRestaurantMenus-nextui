import { Card, Col, Container, Grid, Row, Text } from "@nextui-org/react";
import FooterMenuContent from "./FooterMenuContent";

export default function FooterCardLeft({ isSm }) {
  return (
    <>
      <Container gap={isSm ? 0 : 3}>
        <Row justify="center" align="center" >
          <Card css={{ background: "transparent", boxShadow: "none", textAlign: "center", border: "none" }}>
            <Card.Body>
              <Text
                size={isSm ? 59 : 64}
                weight="bold"
                color="#211D27"
                css={{
                  textAlign: "left",
                  lineHeight: "70px",
                  letterSpacing: "-0.01em"
                }}
              >
                Discover all the delicous local food.
              </Text>
            </Card.Body>
            <Card.Body >
              <Grid.Container justify="center">
                <Grid sm={6} md={8}>
                  <Text
                    size={30}
                    weight="light"
                    color="#8C8B8F"
                  >
                    Millions of local menus. Share food with friends and discover new favorites.
                  </Text>
                </Grid>
                <Grid sm={6} md={4} style={{ margin: '0' }}>
                  <Card.Image
                    src="images/food.png"
                    alt="Default Image"
                    css={{ width: "320px", height: "150px" }}
                    width={300}
                    height={100}
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>
            {!isSm &&
              <FooterMenuContent />
            }
          </Card>
        </Row>
      </Container>
    </>
  )
}
