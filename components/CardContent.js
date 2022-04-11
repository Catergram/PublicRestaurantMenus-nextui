import { useState } from "react";
import { Text, Col, Row, Image, Grid } from "@nextui-org/react";

import ShareModal from "./ShareModal";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function CardContent({ storyButton }) {
  const [isOpen, setIsOpen] = useState(undefined);
  const isSm = useMediaQuery(650);

  const handleClose = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Row>
        <Col className="card-text">
          <Text b size={32} css={{ color: "$white" }}>
            Steak Dish
          </Text>
          <Text size={24} css={{ color: "$white" }}>
            McDonalds
          </Text>
          <Grid.Container gap={isSm ? 1.1 : 1.8} justify="center">
            <Row>
              <Text
                b
                css={{
                  color: "$white",
                  fontSize: 24,
                  "@smMax": {
                    fontSize: 24
                  }
                }}
              >
                $15
              </Text>
              {!storyButton && (
                <>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-1.svg"
                      />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-uber.svg"
                      />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-Grubhub.svg"
                      />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="images/carousel-logo-2.svg"
                      />
                    </Grid>
                  </Col>
                </>
              )}
            </Row>
          </Grid.Container>
        </Col>
        {!storyButton && (
          <Col className="card-image">
            <Row
              justify="center"
              align="flex-start"
              gap={0}
              style={{ margin: "12px 0" }}
            >
              <Image
                src="images/share.svg"
                alt="Default Image"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              />
            </Row>
            <Row justify="center" align="flex-start">
              <Image
                src="images/like.svg"
                alt="Default Image"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              />
            </Row>
          </Col>
        )}
      </Row>

      {!!isOpen && <ShareModal isOpen={isOpen} handleClose={handleClose} />}
    </>
  );
}
