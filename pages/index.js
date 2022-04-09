import Cards from '@components/Card';
import Footer from '@components/Footer';
import Dropdown from '@components/Header';
import { Grid } from "@nextui-org/react";


export default function IndexPage() {

  return (
    <>
      <Dropdown />
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
