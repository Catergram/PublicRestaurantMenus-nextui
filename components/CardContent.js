import { Text, Col, Row, Image, Grid, Button, Container } from "@nextui-org/react";

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
            <Grid xs sm md lg xl>
              <Image
                width={17}
                height={17}
                src="images/carousel-logo-1.svg" />
            </Grid>
          </Col>
          <Col>
            <Grid xs sm md lg xl>
              <Image
                width={17}
                height={17}
                src="images/carousel-logo-uber.svg" />
            </Grid>
          </Col>
          <Col>
            <Grid xs sm md lg xl >
              <Image
                width={17}
                height={17}
                src="images/carousel-logo-Grubhub.svg" />
            </Grid>
          </Col>
          <Col>
            <Grid xs sm md lg xl>
              <Image
                width={17}
                height={17}
                src="images/carousel-logo-2.svg" />
            </Grid>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row justify="center" align="flex-start" gap={0} style={{ margin: "12px 0" }}>
          <Image
            src="images/share.svg"
            alt="Default Image"
            width={24}
            height={24}
          />
        </Row>
        <Row justify="center" align="flex-start" >
          <Image
            src="images/like.svg"
            alt="Default Image"
            width={24}
            height={24}
          />
        </Row>
      </Col>
    </Row>

  )
}
