import { Text, Col, Row, Image, Grid } from "@nextui-org/react";

export default function CardContent() {
  return (
    <Row>
      <Col>
        <Text color="#fff" size={24}>
          Steak Dish
        </Text>
        <Text color="#fff" size={16}>
          Mcdonalds
        </Text>
        <Row>
          <Col>
            <Text color="#fff" size={24}>
              $15
            </Text>
          </Col>
          <Col>
            <Grid.Container gap={2}>
              <Grid>
                <Image
                  width={17}
                  height={17}
                  src="images/carousel-logo-1.svg" />
              </Grid>
            </Grid.Container>
          </Col>
          <Col>
            <Grid.Container gap={2}>
              <Grid>
                <Image
                  width={17}
                  height={17}
                  src="images/carousel-logo-uber.svg" />
              </Grid>
            </Grid.Container>
          </Col>
          <Col>
            <Grid.Container gap={2}>
              <Grid>
                <Image
                  width={17}
                  height={17}
                  src="images/carousel-logo-Grubhub.svg" />
              </Grid>
            </Grid.Container>
          </Col>
          <Col>
            <Grid.Container gap={2}>
              <Grid>
                <Image
                  width={17}
                  height={17}
                  src="images/carousel-logo-2.svg" />
              </Grid>
            </Grid.Container>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row justify="flex-end">
          <Image
            src="images/share.svg"
            alt="Default Image"
            width={24}
            height={24}
          />
        </Row>
        <Row justify="flex-end">
          <Image
            src="images/like.svg"
            alt="Default Image"
            width={24}
            height={24}
          />
        </Row>
      </Col>
    </Row >
  )
}
