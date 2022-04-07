import { Text, Col, Row, Image, Grid, Button, Container } from "@nextui-org/react";
import { useMediaQuery } from "./useMediaQuery";

export default function CardContent() {
  const isSm = useMediaQuery(650);
  return (
    <Row>
      <Col>
        <Text color="#fff" size={24}>
          Steak Dish
        </Text>
        <Text color="#fff" size={16}>
          Mcdonalds
        </Text>

        <Grid.Container gap={isSm ? 1.1 : 1.8} justify="center">
          <Row>
            <Text color="#fff" size={isSm ? 20 : 24}>
              $15
            </Text>
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
        </Grid.Container>
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
