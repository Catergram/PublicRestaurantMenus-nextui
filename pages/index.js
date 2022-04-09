import { Grid } from "@nextui-org/react";

import Cards from '@components/Card';
import Header from '@components/Header';
import Footer from '@components/Footer';


export default function IndexPage() {

  return (
    <>
      <Header />
      <Grid.Container gap={2} justify="center">
        <Grid xs={1} />
        <Grid xs={10}>
          <Cards />
        </Grid>
        <Grid xs={1} />
      </Grid.Container>
      <Footer />
    </>
  )

}
