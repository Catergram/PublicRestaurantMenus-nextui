import { useState } from "react";
import { Text, Col, Row, Image, Grid } from "@nextui-org/react";

import ShareModal from "./ShareModal";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function CardContent({ storyButton, textColorBlack }) {
  const [isOpen, setIsOpen] = useState(undefined);
  const isSm = useMediaQuery(650);

  const handleClose = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Row>
        <Col>
          <Text b size={32} css={{ color: !textColorBlack ? "$white" : "$black" }}>
            Steak Dish
          </Text>
          <Text size={24} css={{ color: !textColorBlack ? "$white" : "$black" }}>
            McDonalds
          </Text>
          <Grid.Container gap={isSm ? 1.1 : 1.8} justify="center">
            <Row>
              <Text
                b
                css={{
                  color: !textColorBlack ? "$white" : "$black",
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
          {storyButton && textColorBlack && <Text size={24} css={{ color: "$black" }}>
            The Crossroads BBQ
          </Text>
          }
        </Col>
        {!storyButton && (
          <Col>
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
                className="cursor-pointer rounded-none"
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
                className="cursor-pointer rounded-none"
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
