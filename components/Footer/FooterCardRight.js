import { Button, Card, Col, Row, Text, Image, Spacer } from "@nextui-org/react";

export default function FooterCardRight() {
  return (
    <Card style={{ background: "transparent", boxShadow: "none", textAlign: "center", border: "none" }}>
      <Card.Body css={{ py: "$10" }}>
        <Col>
          <Text
            size={32}
            weight="light"
            color="#0066CC"
            style={{ textAlign: "center", lineHeight: "131.19%" }}
          >
            Download FoodDiscovery
          </Text>
        </Col>
        <Spacer y={1} />
        <Col>
          <Card.Image
            src="images/app-store.png"
            alt="Default Image"
            width={410}
            height={115}
          />
          <Spacer y={1} />
          <Card.Image
            src="images/google-play.png"
            alt="Default Image"
            width={410}
            height={115}
          />
        </Col>
      </Card.Body>
    </Card>
  )
}
