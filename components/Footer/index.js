import { Button, Card, Col, Container, Grid, Image, Row, Spacer, Text } from "@nextui-org/react";
import FooterCardRight from "./FooterCardRight";

export default function Footer() {
  const MockItem = ({ text }) => {
    return (
      <Card color="primary" >
        <Text h6 size={15} color="white" >
          {text}
        </Text>
      </Card>
    );
  };
  return (
    <>
      <div style={{ background: "#F5F5F5" }}>
        <Row>
          <Col>
            <Grid.Container gap={2} justify="center">
              <Grid sm md lg={8} xs>
                <Row justify="center" align="center">
                  <Card style={{ background: "transparent", boxShadow: "none", textAlign: "center" }}>
                    <Card.Header>
                      <Col>
                        <Text
                          size={64}
                          weight="bold"
                          color="#211D27"
                          style={{
                            textAlign: "left",
                            lineHeight: "70px",
                            letterSpacing: "-0.01em"
                          }}
                        >
                          Discover all the delicous local food.
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Body css={{ py: "$10" }}>
                      <Grid.Container gap={2} justify="center">
                        <Grid xs={8}>
                          {/* <Row justify="flex-end"> */}
                          <Text
                            size={30}
                            weight="light"
                            color="#8C8B8F"
                          // style={{ textAlign: "left" }}
                          >
                            Millions of local menus. Share food with friends and discover new favorites.
                          </Text>
                          {/* </Row> */}
                        </Grid>
                        <Grid xs={4}>
                          {/* <Image
                            width={320}
                            height={215}
                            src="images/food.png"
                            alt="Default Image"
                            objectFit="cover"
                          /> */}

                          <Card.Image
                            src="images/food.png"
                            alt="Default Image"
                            width={300}
                            height={300}
                            style={{ textAlign: "left" }}
                          />

                        </Grid>
                      </Grid.Container>
                    </Card.Body>
                    <Card.Body css={{ py: "$10" }}>
                      <Col>
                        <Text
                          size={24}
                          weight="light"
                          color="#0E0E0E"
                          style={{ textAlign: "left" }}
                        >
                          Menu content and page provided by FoodDiscovery ® App. All rights reserved.
                        </Text>
                      </Col>
                    </Card.Body>
                  </Card>
                </Row>
                {/* <MockItem text="1 of 2" /> */}
              </Grid>
              <Grid sm md lg={4} xs>
                <FooterCardRight />
              </Grid>
            </Grid.Container >
          </Col >
        </Row >
      </div>
    </>
  )
}
