
import { Grid } from "@nextui-org/react";

import Footer from '@components/Footer';

export default function IndexPage() {

  return (
    <>
      <Grid.Container css={{ background: "#fcfcfc" }} justify="center">
        <Grid xs={1} />
        <Grid xs={10}>
          HOME PAGE
        </Grid>
        <Grid xs={1} />
      </Grid.Container>
      <Footer />
    </>
  )

}
