import { useMediaQuery } from "@hooks/useMediaQuery";
import { Card, Col, Grid, Row, Text } from "@nextui-org/react";
import FooterCardRight from "./FooterCardRight";
import FooterCardLeft from "./FooterCardLeft";
import FooterMenuContent from "./FooterMenuContent";

export default function Footer() {
  const isSm = useMediaQuery(650);

  return (
    <>
      <Grid.Container css={{ background: "#F5F5F5" }} justify="center">
        <Grid sm md lg={8} xs >
          <FooterCardLeft isSm={isSm} />
        </Grid>
        <Grid sm md lg={4} xs>
          <FooterCardRight />
        </Grid>
        {isSm &&
          <Grid>
            <FooterMenuContent />
          </Grid>
        }
      </Grid.Container >
    </>
  )
}
