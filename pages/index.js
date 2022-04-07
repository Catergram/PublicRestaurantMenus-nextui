import Cards from '@components/Card';
import Footer from '@components/Footer';
import { Grid, Card, Text, Container } from "@nextui-org/react";
import Navbar from '../components/navbar';

export default function IndexPage() {

  const MockItem = ({ text }) => {
    return (
      <Card color="primary" css={{ h: "$20" }}>
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          {text}
        </Text>
      </Card>
    );
  };

  return (
    <>
      {/* <Header /> */}
      {/* <Cards /> */}
      <Navbar />
      <Grid.Container gap={2} justify="center">
        <Grid xs={1}>
          {/* <MockItem text="1 of 3" /> */}
        </Grid>
        <Grid xs={10}>
          <Cards />
        </Grid>
        <Grid xs={1}>
          {/* <MockItem text="3 of 3" /> */}
        </Grid>
      </Grid.Container>
      <Footer />
    </>
  )

}
