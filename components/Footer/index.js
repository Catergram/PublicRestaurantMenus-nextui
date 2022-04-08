import { useMediaQuery } from "@components/useMediaQuery";
import { Button, Card, Col, Container, Grid, Image, Row, Spacer, Text } from "@nextui-org/react";
import FooterCardRight from "./FooterCardRight";

export default function Footer() {
  const isSm = useMediaQuery(650);

  return (
    <>
      <div style={{ background: "#F5F5F5" }}>
        <Row>
          <Col>
            <Grid.Container gap={2} justify="center">
              <Grid sm md lg={8} xs>
                <Row justify="center" align="center">
                  <Card style={{ background: "transparent", boxShadow: "none", textAlign: "center", border: "none" }}>
                    <Card.Body>
                      <Col>
                        <Text
                          size={isSm ? 59 : 64}
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
                    </Card.Body>
                    <Card.Body >
                      <Grid.Container justify="center">
                        <Row>
                          <Col span={12}>
                            {/* <Grid direction="column"> */}
                            <Text
                              size={30}
                              weight="light"
                              color="#8C8B8F"
                            // style={{ textAlign: "left" }}
                            >
                              Millions of local menus. Share food with friends and discover new favorites.
                            </Text>
                            {/* </Grid> */}
                          </Col>
                          <Col span={6} style={{ margin: '0' }}>
                            {/* <Image
                              src="images/food.png"
                              alt="Default Image"
                              height={150}
                              width={250}
                            // style={{ width: "320px", height: "150px" }}
                            /> */}
                            {/* <Grid direction="column"> */}
                            <Card.Image
                              src="images/food.png"
                              alt="Default Image"
                              style={{ width: "320px", height: "150px" }}
                              width={300}
                              height={100}
                            />
                            {/* </Grid> */}
                          </Col>
                        </Row>
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