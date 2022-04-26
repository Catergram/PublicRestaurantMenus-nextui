import { useState } from "react";
import { Text, Col, Row, Image, Grid } from "@nextui-org/react";

import ShareModal from "./../ShareModal";
import { useMediaQuery } from "@hooks/useMediaQuery";

export default function ItemFooter({ storyButton, textColorBlack, item }) {
  const [isOpen, setIsOpen] = useState(undefined);
  const isSm = useMediaQuery(650);

  const handleClose = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Row>
        <Col>
          <Text b size={26} css={{ color: !textColorBlack ? "$white" : "$black" }}>
            {item.name}
          </Text>
          <Row>
            <Col>
              <Text size={18} css={{ color: !textColorBlack ? "$white" : "$black" }}>
                {item.restaurant.name}
              </Text>
            </Col>
            {!storyButton && (
              <Col span={4}>
                <Row
                  justify="center"
                  align="flex-start"
                  gap={2}
                  style={{ margin: '6px 12px 6px 0'}}
                >
                  <Image
                    src="/images/share.svg"
                    alt="Default Image"
                    width={17}
                    height={17}
                    className="cursor-pointer rounded-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    containerCss={{
                      borderRadius: 0
                    }}
                  />
                  <Image
                    src="/images/like.svg"
                    alt="Default Image"
                    width={17}
                    height={17}
                    className="cursor-pointer rounded-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    containerCss={{
                      borderRadius: 0
                    }}
                  />
                </Row>
              </Col>
            )}
          </Row>

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
                ${Math.round(item.price)}
              </Text>
              {!storyButton && (
                <>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="/images/carousel-logo-1.svg"
                      />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="/images/carousel-logo-uber.svg"
                      />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="/images/carousel-logo-Grubhub.svg"
                      />
                    </Grid>
                  </Col>
                  <Col>
                    <Grid xl>
                      <Image
                        width={17}
                        height={17}
                        src="/images/carousel-logo-2.svg"
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
      </Row>

      {!!isOpen && <ShareModal isOpen={isOpen} handleClose={handleClose} />}
    </>
  );
}
